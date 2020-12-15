import {
  defineNuxtPlugin,
  onGlobalSetup,
  provide,
  reactive,
} from '@nuxtjs/composition-api'
import { Upgrade } from '~/composables/business'
import { Session, SessionKey, Status } from '~/composables/session'
import firebase from 'firebase/app'
import 'firebase/auth'

/**
 * Fetch session data (contains business state and cash on hands).
 */
export default defineNuxtPlugin(async () => {
  const session = await initializeSession()
  // Profit while away
  await madeProfitWhileAway(session)
  onGlobalSetup(() => {
    provide(SessionKey, session)
  })
})

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

const initializeSession = async () => {
  const session = reactive<Session>({
    cash: 0,
    updatedAt: firebase.firestore.Timestamp.now(),
    statuses: {},
  })
  await Promise.all([
    new Promise((resolve) => {
      firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser!.uid)
        .onSnapshot((snapshot) => {
          if (!snapshot.exists) {
            return
          }
          session.cash = snapshot.get('cash')
          session.updatedAt = snapshot.get('updatedAt', {
            serverTimestamps: 'estimate',
          })
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
  return session
}

/**
 * Calculate profit while away, and then add them to cash.
 * @param session
 */
const madeProfitWhileAway = async (session: Session) => {
  const leaveTime = Date.now() - session.updatedAt.toMillis()
  const businesses = await firebase.firestore().collection('businesses').get()
  const profit = businesses.docs
    .map((business) => {
      const status = session.statuses[business.id]
      if (status === undefined || !status.manager) {
        return 0
      }
      const multiplier = business
        .get('upgrades')
        .filter(
          (upgrade: Upgrade, index: number) =>
            index < session.statuses[business.id].grade
        )
        .map((upgrade: Upgrade) => upgrade.multiplier)
        .reduce(
          (previousValue: number, currentValue: number) =>
            previousValue * currentValue,
          1
        )
      return (
        (business.get('earnings') *
          session.statuses[business.id].branches *
          multiplier *
          leaveTime) /
        business.get('interval')
      )
    })
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
  await firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser!.uid)
    .update({
      cash: firebase.firestore.FieldValue.increment(profit),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
}
