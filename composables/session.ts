import { InjectionKey, inject } from '@nuxtjs/composition-api'
import firebase from 'firebase/app'
import 'firebase/firestore'

export type Session = {
  cash: number
  statuses: {
    [key: string]: Status
  }
}

export type Status = {
  reference: firebase.firestore.DocumentReference
  branches: number
  upgraded: boolean
  manager: boolean
}

export const SessionKey: InjectionKey<Session> = Symbol()

export const useSession = () => {
  const session = inject(SessionKey)
  if (session === undefined) {
    throw new Error('session is not provided')
  }
  return { session }
}
