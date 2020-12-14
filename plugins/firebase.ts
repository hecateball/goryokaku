import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import firebase from 'firebase/app'

export default defineNuxtPlugin(async ({ $config }) => {
  if (firebase.apps.length !== 0) {
    return
  }
  firebase.initializeApp($config.firebaseConfig)
})
