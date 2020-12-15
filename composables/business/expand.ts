import { useSession } from '~/composables/session'
import { computed } from '@nuxtjs/composition-api'
import { Business } from '~/composables/business/index'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export const useExpand = (business: Business) => {
  const { session } = useSession()
  const disabled = computed(() => session.cash < business.expansion.cost)
  const expand = async () => {
    if (disabled.value) {
      return
    }
    const batch = firebase.firestore().batch()
    const userReference = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser!.uid)
    batch.update(userReference, {
      cash: firebase.firestore.FieldValue.increment(
        -1 * business.expansion.cost
      ),
    })
    batch.update(session.statuses[business.id].reference, {
      branches: firebase.firestore.FieldValue.increment(1),
    })
    await batch.commit()
  }
  return { expand, disabled }
}
