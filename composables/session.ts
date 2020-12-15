import { InjectionKey, inject } from '@nuxtjs/composition-api'
import firebase from 'firebase/app'
import 'firebase/firestore'

export type Session = {
  cash: number
  updatedAt: firebase.firestore.Timestamp
  statuses: {
    [key: string]: Status
  }
}

export type Status = {
  reference: firebase.firestore.DocumentReference
  branches: number
  manager: boolean
  grade: number
}

export const SessionKey: InjectionKey<Session> = Symbol()

export const useSession = () => {
  const session = inject(SessionKey)
  if (session === undefined) {
    throw new Error('session is not provided')
  }
  return { session }
}
