import {
  InjectionKey,
  onUnmounted,
  provide,
  inject,
  reactive,
} from '@nuxtjs/composition-api'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export type Session = {
  cash: number
}

export const SessionKey: InjectionKey<Session> = Symbol()

export const useSession = () => {
  const session = inject(SessionKey)
  if (session === undefined) {
    throw new Error('session is not provided')
  }
  return { session }
}
