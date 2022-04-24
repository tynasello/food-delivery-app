import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonCustom } from '.'
import { UserContext } from '../../../context'
import { useLogoutMutation } from '../../../graphql/generated/schema'

const SignoutButton = () => {
  const { setAndPersistUserContextValue } = useContext(UserContext)

  const navigate = useNavigate()
  const [logout] = useLogoutMutation()

  const handleSignout = async () => {
    await logout()
    localStorage.removeItem('at')
    localStorage.removeItem('rt')

    setAndPersistUserContextValue(null)

    navigate('/')
  }

  return (
    <ButtonCustom variant="outlined" rounded onClick={handleSignout}>
      Sign Out
    </ButtonCustom>
  )
}

export default SignoutButton
