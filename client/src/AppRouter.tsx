import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserContext } from './context'
import { User } from './graphql/generated/schema'
import { Landing } from './Pages'
import { AuthContainer } from './Pages/shared'

const AppRouter = () => {
  const [userContextValue, setUserContextValue] = useState<User | null>(null)

  const setAndPersistUserContextValue = (value: User | null) => {
    setUserContextValue(value)
    localStorage.setItem('userContext', JSON.stringify(value))
  }

  return (
    <UserContext.Provider value={{ userContextValue, setAndPersistUserContextValue }}>
      <Routes>
        <Route path="*" element={<Landing />} />
        <Route path="/home" element={<AuthContainer page="home" />} />
        <Route path="/checkout" element={<AuthContainer page="checkout" />} />
      </Routes>
    </UserContext.Provider>
  )
}

export default AppRouter
