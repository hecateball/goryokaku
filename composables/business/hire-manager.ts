import { useSession } from '~/composables/session'
import { computed } from '@nuxtjs/composition-api'
import { Business } from '~/composables/business/index'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export const useHireManager = (business: Business) => {
  const { session } = useSession()
  const disabled = computed(
    () =>
      session.statuses[business.id].automated ||
      session.cash < business.manager.cost
  )
  const hireManager = async () => {
    if (disabled.value) {
      return
    }
    const batch = firebase.firestore().batch()
    const userReference = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser!.uid)
    batch.update(userReference, {
      cash: firebase.firestore.FieldValue.increment(-1 * business.manager.cost),
    })
    batch.update(session.statuses[business.id].reference, {
      automated: true,
    })
    await batch.commit()
  }

  return { hireManager, disabled }
}
