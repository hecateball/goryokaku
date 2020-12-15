import { ref, watchEffect } from '@nuxtjs/composition-api'
import { Business } from '~/composables/business/index'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { useSession } from '~/composables/session'

export const useRun = (business: Business) => {
  const running = ref<boolean>(false)
  const { session } = useSession()
  const run = async () => {
    if (running.value) {
      return
    }
    running.value = true
    setTimeout(() => (running.value = false), business.interval)
    const currentUser = firebase.auth().currentUser
    if (currentUser === null) {
      throw new Error('unauthenticated')
    }
    await firebase
      .firestore()
      .collection('users')
      .doc(currentUser.uid)
      .update({
        cash: firebase.firestore.FieldValue.increment(
          business.earnings * session.statuses[business.id].branches
        ),
      })
  }
  watchEffect(async () => {
    if (running.value) {
      return
    }
    if (session.statuses[business.id].manager) {
      await run()
    }
  })
  return {
    run,
    running,
  }
}
