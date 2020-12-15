import {
  defineNuxtPlugin,
  onGlobalSetup,
  onUnmounted,
} from '@nuxtjs/composition-api'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firestore = firebase.firestore

/**
 * Get user account from indexed DB and create session.
 * If the user does not have one yet, Issue an anonymous account.
 */
export default defineNuxtPlugin(async () => {
  await new Promise<Function>((resolve) => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(async (currentUser: firebase.User | null) => {
        if (currentUser === null) {
          const credential = await firebase.auth().signInAnonymously()
          await createSession(credential.user!)
          return
        }
        unsubscribe()
        resolve()
      })
  })
})

const createSession = async (user: firebase.User) => {
  const businesses = await firebase
    .firestore()
    .collection('businesses')
    .orderBy('earnings', 'asc')
    .limit(1)
    .get()
  const batch = firebase.firestore().batch()
  const userReference = firebase.firestore().collection('users').doc(user.uid)
  batch.set(userReference, {
    cash: 0,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
  batch.set(userReference.collection('statuses').doc(), {
    reference: businesses.docs[0].ref,
    branches: 1,
    manager: false,
    grade: 0,
  })
  await batch.commit()
}
