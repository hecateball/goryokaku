import { ref, watchEffect } from '@nuxtjs/composition-api'
import { Business } from '~/composables/business/index'
import { Session, useSession } from '~/composables/session'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

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
    const profit = calculateProfit(business, session)
    await firebase
      .firestore()
      .collection('users')
      .doc(currentUser.uid)
      .update({
        cash: firebase.firestore.FieldValue.increment(profit),
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

const calculateProfit = (business: Business, session: Session) => {
  const multiplier = business.upgrades
    .filter((upgrade, index) => index < session.statuses[business.id].grade)
    .map((upgrade) => upgrade.multiplier)
    .reduce((previousValue, currentValue) => previousValue * currentValue, 1)
  return business.earnings * session.statuses[business.id].branches * multiplier
}
