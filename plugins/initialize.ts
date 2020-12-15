import {
  defineNuxtPlugin,
  onGlobalSetup,
  onUnmounted,
  provide,
  reactive,
} from '@nuxtjs/composition-api'
import { Session, SessionKey } from '~/composables/session'
import firebase from 'firebase/app'
import 'firebase/auth'

export default defineNuxtPlugin(async () => {
  const currentUser = firebase.auth().currentUser
  if (currentUser === null) {
    throw new Error('unauthenticated')
  }
  const session = reactive<Session>({
    cash: 0,
  })
  const unsubscribe = await new Promise<Function>((resolve) => {
    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(currentUser.uid)
      .onSnapshot((snapshot) => {
        if (!snapshot.exists) {
          console.warn('invalid session')
          return
        }
        session.cash = snapshot.get('cash')
        resolve(unsubscribe)
      })
  })
  onGlobalSetup(() => {
    provide(SessionKey, session)
    onUnmounted(unsubscribe)
  })
})
