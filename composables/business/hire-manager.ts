import { useSession } from '~/composables/session'
import { computed } from '@nuxtjs/composition-api'
import { Business, Status } from '~/composables/business/index'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export const useHireManager = (
  business: Pick<Business, 'manager'>,
  status: Pick<Status, 'reference' | 'automated'>
) => {
  const { session } = useSession()
  const hireManager = async () => {
    const currentUser = firebase.auth().currentUser
    if (currentUser === null) {
      throw new Error('unauthenticated')
    }
    if (session.cash < business.manager.cost) {
      return
    }
    const batch = firebase.firestore().batch()
    const userReference = firebase
      .firestore()
      .collection('users')
      .doc(currentUser.uid)
    batch.update(userReference, {
      cash: firebase.firestore.FieldValue.increment(-1 * business.manager.cost),
    })
    batch.update(status.reference.value, {
      automated: true,
    })
    await batch.commit()
  }
  const disabled = computed(
    () => status.automated.value || session.cash < business.manager.cost
  )
  return { hireManager, disabled }
}
