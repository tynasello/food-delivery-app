import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Checkout, Home } from '..'
import { Loading } from '../../components/shared'
import { UserContext } from '../../context'
import { useGetUserQuery } from '../../graphql/generated/schema'

interface Props {
  page: 'home' | 'checkout'
}

const AuthContainer = ({ page }: Props) => {
  const { setAndPersistUserContextValue } = useContext(UserContext)

  const navigate = useNavigate()

  const { loading, error, data } = useGetUserQuery({ fetchPolicy: 'network-only' })

  const user = data?.getUser

  useEffect(() => {
    if (user) setAndPersistUserContextValue(user)
  }, [data])

  if (loading) return <Loading />
  if (error || !user) {
    navigate('/')
  }

  return <>{page === 'home' ? <Home /> : <Checkout />}</>
}

export default AuthContainer
