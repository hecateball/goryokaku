import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default defineNuxtPlugin(async ({ $config }) => {
  if (firebase.apps.length !== 0) {
    return
  }
  firebase.initializeApp($config.firebaseConfig)
  firebase.auth().useEmulator('http://localhost:9099/')
  firebase.firestore().useEmulator('localhost', 8080)
  await setupBusiness()
})

const setupBusiness = async () => {
  const snapshot = await firebase
    .firestore()
    .collection('businesses')
    .limit(1)
    .get()
  if (!snapshot.empty) {
    return
  }
  const batch = firebase.firestore().batch()
  batch.set(firebase.firestore().collection('businesses').doc(), {
    displayName: 'Lemonade Stand',
    earnings: 1,
    interval: 1000,
    expansion: { cost: 10 },
    manager: { cost: 25 },
    upgrade: { cost: 20 },
  })
  await batch.commit()
}
