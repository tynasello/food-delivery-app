import { createContext } from 'react'
import { User } from './../graphql/generated/schema'

export interface UserContextState {
  userContextValue: User | null
  setAndPersistUserContextValue: (value: User | null) => void
}

export const UserContext = createContext<UserContextState>({
  userContextValue: null,
  setAndPersistUserContextValue: () => {
    return
  },
})
