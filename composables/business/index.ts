import {
  Ref,
  ref,
  reactive,
  toRefs,
  useFetch,
  onUnmounted,
} from '@nuxtjs/composition-api'
import firebase from 'firebase/app'
import 'firebase/auth'

export { useRun } from '~/composables/business/run'
export { useExpand } from '~/composables/business/expand'
export { useHireManager } from '~/composables/business/hire-manager'
export { useUpgrade } from '~/composables/business/upgrade'

export type Business = {
  id: string
  displayName: string
  earnings: number
  interval: number
  expansion: {
    cost: number
  }
  manager: {
    cost: number
  }
  upgrades: {
    displayName: string
    cost: number
  }[]
}

const converter: firebase.firestore.FirestoreDataConverter<Business> = {
  fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot): Business {
    return {
      id: snapshot.id,
      displayName: snapshot.get('displayName'),
      earnings: snapshot.get('earnings'),
      interval: snapshot.get('interval'),
      expansion: snapshot.get('expansion'),
      manager: snapshot.get('manager'),
      upgrades: [
        {
          displayName: 'Something',
          cost: snapshot.get('upgrade').cost,
        },
      ],
    }
  },
  toFirestore() {
    throw new ReferenceError('Do not update Business')
  },
}

export const useBusinesses = () => {
  const businesses = ref<Business[]>([])
  const { fetchState } = useFetch(async () => {
    const snapshot = await firebase
      .firestore()
      .collection('businesses')
      .withConverter(converter)
      .get()
    businesses.value = snapshot.docs.map((doc) => doc.data())
  })
  return { businesses, fetchState }
}
