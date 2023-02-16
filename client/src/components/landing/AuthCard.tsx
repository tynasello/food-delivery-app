import { useState } from 'react'
import styled from 'styled-components'
import { AuthForm } from '.'
import { Text } from '../shared/typography'

const AuthCard = () => {
  const authInfo = {
    signUp: { title: 'Create An Account 👨‍💻', subtitle: 'Already A Member?' },
    signIn: {
      title: 'Sign Into Your Account 👤',
      subtitle: "Don't Have An Account?",
    },
  }

  const [method, setMethod] = useState<'signUp' | 'signIn'>('signUp')

  return (
    <AuthCardContainer>
      <CardHeader>
        <Text type="SubTitle">START ORDERING TODAY</Text>
        <Text type="Title">{authInfo[method].title}</Text>
        <Text type="Main">
          {authInfo[method].subtitle}
          <Text
            type="Main"
            color="primary.main"
            sx={{ cursor: 'pointer' }}
            component="span"
            onClick={() => {
              setMethod(method === 'signUp' ? 'signIn' : 'signUp')
            }}
          >
            {method === 'signUp' ? ' Sign In' : ' Sign Up'}
          </Text>
        </Text>
      </CardHeader>

      <AuthForm method={method} />
      <Text type="Error" sx={{ margin: '1rem' }}>
        Backend is hosted on a free tier, please allow up to 30 seconds for server to start.
      </Text>
    </AuthCardContainer>
  )
}

export default AuthCard

const AuthCardContainer = styled.div`
  max-width: 700px;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 2rem 0;
`
