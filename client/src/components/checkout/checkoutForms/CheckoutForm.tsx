import { Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { useContext, useState } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'
import { PaymentOption } from '..'
import { UserContext } from '../../../context'
import { ButtonCustom } from '../../shared/inputs'
import { Bottom } from '../../shared/styles'
import { Text } from '../../shared/typography'

const checkoutSchema = Yup.object().shape({
  paymentMethod: Yup.string().required('Must Choose A Payment Method'),
})

const checkoutInitialValues = { paymentMethod: '' }

const CheckoutForm = () => {
  const { userContextValue: user } = useContext(UserContext)

  const [orderPlaced, setOrderPlaced] = useState(false)
  const [selected, setSelected] = useState('')

  const onSubmit = async () => {
    setOrderPlaced(true)
  }

  return (
    <Formik
      initialValues={checkoutInitialValues}
      validationSchema={checkoutSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={true}
    >
      {({ touched, errors }) => (
        <Form>
          <PaymentOptionsContainer>
            <PaymentOption selected={selected} setSelected={setSelected} optionName="PayPal" />
            <PaymentOption selected={selected} setSelected={setSelected} optionName="Visa" />
            <PaymentOption selected={selected} setSelected={setSelected} optionName="Debit" />
            {touched.paymentMethod && errors.paymentMethod && (
              <Text type="Error" sx={{ padding: '1rem 0' }}>
                {errors.paymentMethod}
              </Text>
            )}
          </PaymentOptionsContainer>

          <Bottom>
            <Text type="Main" color="text.secondary">
              {' '}
              Deliverying To:{' '}
              <Box display="inline" color="primary.main">
                {user?.address}
              </Box>
            </Text>
          </Bottom>

          <ButtonCustom variant="contained" rounded type="submit" sx={{ padding: '.7rem 1rem' }}>
            Place Your Order
          </ButtonCustom>

          {!(touched.paymentMethod && errors.paymentMethod) && orderPlaced && (
            <OrderPlacedContainer>
              <Text type="Title" color="text.primary">
                Your Order Has Been Placed!
                <Text type="SubTitle" color="text.secondary">
                  (Not Really...) Thanks for &quot;checking out&quot; the project 😄
                </Text>
              </Text>
            </OrderPlacedContainer>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default CheckoutForm

const OrderPlacedContainer = styled.div`
  margin-top: 3rem;
`
const PaymentOptionsContainer = styled.div`
  max-width: 250px;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.3rem;
`
