import { computed } from '@nuxtjs/composition-api'
import { Business } from '~/composables/business/index'
import { useSession } from '~/composables/session'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export const useUpgrade = (business: Business) => {
  const { session } = useSession()
  const disabled = computed(
    () =>
      session.statuses[business.id].upgraded ||
      session.cash < business.upgrades[0].cost
  )
  const upgrade = async () => {
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
        -1 * business.upgrades[0].cost
      ),
    })
    batch.update(session.statuses[business.id].reference, {
      upgraded: true,
    })
    await batch.commit()
  }

  return { upgrade, disabled }
}
