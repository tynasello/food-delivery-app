import { Button, SxProps } from '@mui/material'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  variant: 'outlined' | 'contained'
  type?: 'submit'
  color?: 'primary' | 'secondary' | 'success' | null
  rounded?: boolean
  sx?: SxProps
  onClick?: () => void
  children: ReactNode
}

const ButtonCustom = ({ variant, type, color, rounded, sx, onClick, children }: Props) => {
  return (
    <Button
      variant={variant}
      color={color ?? undefined}
      type={type}
      component={motion.button}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      sx={{
        ...sx,
        borderRadius: rounded ? '2rem' : 0,
        textAlign: 'center',
        fontSize: 'clamp(.8rem, 1vw, 1rem)',
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default ButtonCustom
