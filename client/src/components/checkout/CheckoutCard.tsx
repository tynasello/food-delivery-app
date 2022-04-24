import { useContext } from 'react'
import styled from 'styled-components'
import { UserContext } from '../../context'
import { useGetFoodsQuery } from '../../graphql/generated/schema'
import { theme } from '../../theme/GlobalStyle'
import { Text } from '../shared/typography'
import { CheckoutForm } from './checkoutForms'

const CheckoutCard = () => {
  const { userContextValue: user } = useContext(UserContext)

  const cart = JSON.parse(user?.cartCount || '{}')
  let cartPrice = 0

  const { data } = useGetFoodsQuery()
  const food = data?.getFoods

  food?.forEach((item) => {
    if (cart[item.id]) cartPrice += item.price * cart[item.id]
  })

  return (
    <CheckoutCardContainer>
      <CardHeader>
        <Text type="Header" color="">
          Ready To Order
          <span style={{ color: `${theme.palette.primary.main}` }}> ?</span>
        </Text>
        <Text type="Main" color="text.secondary">
          Please Choose a Payment Method
        </Text>
        <Text type="SubTitle" color="text.primary">
          Your Total is $ {cartPrice.toFixed(2)}
        </Text>
      </CardHeader>
      <FormContainer>
        <CheckoutForm />
      </FormContainer>
    </CheckoutCardContainer>
  )
}

export default CheckoutCard

const CheckoutCardContainer = styled.div`
  display: flex;
  margin: 0 8vw;
  flex-direction: column;
  justify-content: space-around;
  max-width: 600px;
  padding-top: 2rem;
`
const CardHeader = styled.div`
  min-height: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  > * {
    padding: 0.4rem 0;
  }
`
const FormContainer = styled.div``
