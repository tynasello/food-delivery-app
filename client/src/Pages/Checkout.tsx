import styled from 'styled-components'
import { CheckoutCard } from '../components/checkout'
import { StoreHeader } from '../components/shared/typography'

const Checkout = () => {
  return (
    <>
      <CheckoutContainer>
        <StoreHeader inCheckout={true} />
        <CheckoutCard />
      </CheckoutContainer>
    </>
  )
}

export default Checkout

const CheckoutContainer = styled.div`
  margin-bottom: 4rem;
`

// const BgIllustration = styled.img`
//   z-index: -1;
//   position: absolute;
//   top: 50%;
//   right: 5vw;
//   transform: translate(0, -50%);
//   width: 50vw;
//   max-width: 900px;
//   @media (max-width: 768px) {
//     display: none;
//   }
