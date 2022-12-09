import styled from 'styled-components'
import landing from '../assets/image/landing.png'
import { AuthCard } from '../components/landing'
import { Text } from '../components/shared/typography'
import { useImageLazyLoader } from '../hooks'

const Landing = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [src]: any = useImageLazyLoader(
    '../assets/image/landingTiny.png',
    '../assets/image/landing.png'
  )

  return (
    <>
      <LandingBg
        style={{
          background: `linear-gradient(rgba(5, 5, 8, 0.8), rgba(9, 8, 13, 0.8)), url('${
            src.includes('Tiny') ? landing : landing
          }') top center / cover no-repeat fixed padding-box content-box`,
        }}
      ></LandingBg>
      <LandingContainer>
        <HeaderContainer>
          <Text type="Header">Breaking Bread</Text>
          <Text type="SubTitle">(Food Delivery App)</Text>
        </HeaderContainer>
        <AuthCard />
      </LandingContainer>
    </>
  )
}

export default Landing

const LandingBg = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
`
const LandingContainer = styled.div`
  padding: 4rem 8vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 65vh;
`
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
