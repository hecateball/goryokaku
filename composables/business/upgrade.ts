import { useSession } from '~/composables/session'
import { computed } from '@nuxtjs/composition-api'
import { Business, Status } from '~/composables/business/index'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export const useUpgrade = (
  business: Pick<Business, 'upgrade'>,
  status: Pick<Status, 'reference' | 'upgraded'>
) => {
  const { session } = useSession()
  const upgrade = async () => {
    const currentUser = firebase.auth().currentUser
    if (currentUser === null) {
      throw new Error('unauthenticated')
    }
    if (session.cash < business.upgrade.cost) {
      return
    }
    const batch = firebase.firestore().batch()
    const userReference = firebase
      .firestore()
      .collection('users')
      .doc(currentUser.uid)
    batch.update(userReference, {
      cash: firebase.firestore.FieldValue.increment(-1 * business.upgrade.cost),
    })
    batch.update(status.reference.value, {
      upgraded: true,
    })
    await batch.commit()
  }
  const disabled = computed(
    () => status.upgraded.value || session.cash < business.upgrade.cost
  )
  return { upgrade, disabled }
}
