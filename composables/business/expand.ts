import { useSession } from '~/composables/session'
import { computed } from '@nuxtjs/composition-api'
import { Business, Status } from '~/composables/business/index'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export const useExpand = (
  business: Pick<Business, 'expansion'>,
  status: Pick<Status, 'reference'>
) => {
  const { session } = useSession()
  const expand = async () => {
    const currentUser = firebase.auth().currentUser
    if (currentUser === null) {
      throw new Error('unauthenticated')
    }
    if (session.cash < business.expansion.cost) {
      return
    }
    const batch = firebase.firestore().batch()
    const userReference = firebase
      .firestore()
      .collection('users')
      .doc(currentUser.uid)
    batch.update(userReference, {
      cash: firebase.firestore.FieldValue.increment(
        -1 * business.expansion.cost
      ),
    })
    batch.update(status.reference.value, {
      branches: firebase.firestore.FieldValue.increment(1),
    })
    await batch.commit()
  }
  const disabled = computed(() => session.cash < business.expansion.cost)
  return { expand, disabled }
}
