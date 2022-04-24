import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { IconButton } from '@mui/material'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Text } from '.'
import { UserContext } from '../../../context'
import { CartModal } from '../../home'
import { ButtonCustom, SignoutButton } from '../inputs'

interface Props {
  inCheckout?: boolean
}

const StoreHeader = ({ inCheckout = false }: Props) => {
  const { userContextValue: user } = useContext(UserContext)

  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <StoreHeaderContainer>
      <CartModal handleClose={() => setOpen(false)} open={open} inCheckout={inCheckout} />

      <StoreHeaderLeft>
        <Text type="Main" color="black" sx={{ marginRight: '1rem' }}>
          Hello {user?.username} 😄
        </Text>
        <SignoutButton />
      </StoreHeaderLeft>
      <StoreHeaderRight>
        {inCheckout && (
          <ButtonCustom
            variant="outlined"
            sx={{ margin: '0 1rem' }}
            rounded
            onClick={() => {
              navigate('/home')
            }}
          >
            Back to store
          </ButtonCustom>
        )}
        <IconButton onClick={() => setOpen(true)}>
          <ShoppingCartIcon sx={{ fontSize: 'clamp(1.6rem, 2.5vw, 3rem)', color: '#424949' }} />
        </IconButton>
      </StoreHeaderRight>
    </StoreHeaderContainer>
  )
}

export default StoreHeader

export const StoreHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
`
export const StoreHeaderLeft = styled.div`
  display: flex;
  align-items: center;
`
export const StoreHeaderRight = styled.div`
  display: flex;
  align-items: center;
`
