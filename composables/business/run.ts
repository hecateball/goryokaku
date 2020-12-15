import { ref, watchEffect } from '@nuxtjs/composition-api'
import { Business, Status } from '~/composables/business/index'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export const useRun = (
  business: Pick<Business, 'earnings' | 'interval'>,
  status: Pick<Status, 'branches' | 'automated'>
) => {
  const running = ref<boolean>(false)
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
          business.earnings * status.branches.value
        ),
      })
  }
  watchEffect(async () => {
    if (running.value) {
      return
    }
    if (status.automated.value) {
      await run()
    }
  })
  return {
    run,
    running,
  }
}
