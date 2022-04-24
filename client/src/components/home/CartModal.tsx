import { Dialog, DialogActions, DialogContent, DialogTitle, Paper } from '@mui/material'
import { useContext, useState } from 'react'
import Draggable from 'react-draggable'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { CartModalFood } from '.'
import { UserContext } from '../../context'
import { useGetFoodsQuery } from '../../graphql/generated/schema'
import { Error } from '../shared'
import { ButtonCustom } from '../shared/inputs'
import { Text } from '../shared/typography'

interface Props {
  inCheckout?: boolean
  handleClose: () => void
  open: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PaperComponent(props: any) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

const CartModal = ({ inCheckout = false, handleClose, open }: Props) => {
  const navigate = useNavigate()
  const { userContextValue: user } = useContext(UserContext)
  const cart = JSON.parse(user?.cartCount || '{}')

  const [isCartEmpty, setIsCartEmpty] = useState(true)

  let cartPrice = 0

  const { error, data } = useGetFoodsQuery()

  if (error || !user) return <Error />

  const food = data?.getFoods

  food?.forEach((item) => {
    if (cart[item.id]) cartPrice += item.price * cart[item.id]
  })

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      PaperProps={{
        sx: {
          position: 'absolute',
          right: '-1rem',
          top: '4rem',
          maxHeight: '85vh',
          minWidth: '35vw',
        },
      }}
    >
      <CartModalContainer>
        <DialogTitle sx={{ padding: 'inherit' }}>
          <Text
            type="SubTitle"
            color=""
            sx={{ cursor: 'move' }}
            aria-label="draggable-dialog-title"
          >
            🛒 CHECKOUT
          </Text>
        </DialogTitle>
        <Text type="SubTitle" color="">
          ${cartPrice.toFixed(2)}
        </Text>
      </CartModalContainer>
      <DialogContent>
        <CartModalFood
          food={food ?? []}
          isCartEmpty={isCartEmpty}
          setIsCartEmpty={setIsCartEmpty}
        />
      </DialogContent>
      <DialogActions sx={{ margin: '.5rem ' }}>
        <ButtonCustom
          variant="contained"
          rounded
          onClick={handleClose}
          sx={{ marginRight: '.5rem' }}
        >
          Cancel
        </ButtonCustom>
        {!inCheckout && (
          <ButtonCustom
            variant="contained"
            rounded
            onClick={() => {
              handleClose()
              navigate('/checkout')
            }}
          >
            Checkout
          </ButtonCustom>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default CartModal

const CartModalContainer = styled.div`
  display: flex;
  flex-direction: 'row';
  justify-content: space-between;
  margin: 2rem 2.5rem 1rem 2.5rem;
`
