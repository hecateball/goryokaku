import {
  defineNuxtPlugin,
  onGlobalSetup,
  onUnmounted,
  provide,
  reactive,
} from '@nuxtjs/composition-api'
import { Session, SessionKey, Status } from '~/composables/session'
import firebase from 'firebase/app'
import 'firebase/auth'

const converter = {
  fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot) => {
    return {
      business: snapshot.get('reference'),
      branches: snapshot.get('branches'),
      manager: snapshot.get('manager'),
      grade: snapshot.get('grade'),
    }
  },
  toFirestore: () => {
    throw new ReferenceError('Do not update Statuses here.')
  },
}

export default defineNuxtPlugin(async () => {
  const session = reactive<Session>({
    cash: 0,
    statuses: {},
  })
  await new Promise<Function>(async (resolve) => {
    await Promise.all([
      new Promise((resolve) => {
        firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser!.uid)
          .onSnapshot((snapshot) => {
            if (!snapshot.exists) {
              console.debug('invalid session')
              return
            }
            session.cash = snapshot.get('cash')
            resolve()
          })
      }),
      new Promise((resolve) => {
        firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser!.uid)
          .collection('statuses')
          .withConverter(converter)
          .onSnapshot((snapshot) => {
            const statuses: { [key: string]: Status } = {}
            snapshot.docs.forEach((status) => {
              statuses[status.data().business.id] = {
                reference: status.ref,
                branches: status.data().branches,
                manager: status.data().manager,
                grade: status.data().grade,
              }
            })
            session.statuses = statuses
            resolve()
          })
      }),
    ])
    resolve()
  })
  onGlobalSetup(() => {
    provide(SessionKey, session)
  })
})
