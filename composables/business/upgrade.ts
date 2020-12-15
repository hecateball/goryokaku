import { computed } from '@nuxtjs/composition-api'
import { Business } from '~/composables/business/index'
import { useSession } from '~/composables/session'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

/**
 * Create a function to update given business.
 * @param business
 */
export const useUpgrade = (business: Business) => {
  const { session } = useSession()
  const disabled = computed(
    () =>
      session.statuses[business.id].grade === business.upgrades.length ||
      session.cash < business.upgrades[session.statuses[business.id].grade].cost
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
        -1 * business.upgrades[session.statuses[business.id].grade].cost
      ),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    batch.update(session.statuses[business.id].reference, {
      grade: firebase.firestore.FieldValue.increment(1),
    })
    await batch.commit()
  }

  return { upgrade, disabled }
}
