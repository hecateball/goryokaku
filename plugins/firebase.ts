import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

/**
 * Initialize Firebase backend.
 */
export default defineNuxtPlugin(async ({ $config }) => {
  if (firebase.apps.length !== 0) {
    return
  }
  firebase.initializeApp($config.firebaseConfig)

  // Since this application updates user data frequently,
  // use emulators by default to avoid reaching Firestore quota.
  firebase.auth().useEmulator('http://localhost:9099/')
  firebase.firestore().useEmulator('localhost', 8080)
  await setupBusinesses($config.businesses)
})

/**
 * Create sample business data (if and only if there are no data stored in DB).
 * @param businesses
 */
const setupBusinesses = async (businesses: object[]) => {
  const snapshot = await firebase
    .firestore()
    .collection('businesses')
    .limit(1)
    .get()
  if (!snapshot.empty) {
    return
  }
  const batch = firebase.firestore().batch()
  businesses.forEach((business) =>
    batch.set(firebase.firestore().collection('businesses').doc(), business)
  )
  await batch.commit()
}
