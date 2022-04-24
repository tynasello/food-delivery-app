import { SxProps, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  type: 'Header' | 'Title' | 'SubTitle' | 'Main' | 'Small' | 'Error'
  color?: string
  align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined
  sx?: SxProps
  onClick?: () => void
  component?: 'span'
  children: ReactNode
}
interface TypographyInterface {
  [keys: string]: {
    variant: 'h2' | 'h4' | 'h6' | 'body1' | 'body2'
    color: string
    fontSize?: string
  }
}

const Text = ({ type, color, align, sx, onClick, component, children }: Props) => {
  const typographyStyles: TypographyInterface = {
    Header: { variant: 'h2', color: '#D5DBDB', fontSize: 'clamp(2rem, 4.5vw, 5rem)' },
    Title: { variant: 'h4', color: '#F2F3F4', fontSize: 'clamp(1.5rem, 2.6vw, 4rem)' },
    SubTitle: { variant: 'h6', color: '#B3B6B7', fontSize: 'clamp(1rem, 1.6vw, 2rem)' },
    Main: { variant: 'body1', color: '#B3B6B7', fontSize: 'clamp(.9rem, 1.4vw, 1.7rem)' },
    Small: { variant: 'body2', color: '#B3B6B7', fontSize: 'clamp(.7rem, 1.2vw, 1.5rem)' },
    Error: { variant: 'body1', color: '#E74C3C', fontSize: 'clamp(.8rem, 1.2vw, 1.7rem)' },
  }

  return (
    <Typography
      variant={typographyStyles[type].variant}
      color={color ?? typographyStyles[type].color}
      align={align}
      component={component ?? 'div'}
      sx={{ ...sx, fontSize: typographyStyles[type].fontSize ?? null }}
      onClick={onClick}
    >
      {children}
    </Typography>
  )
}

export default Text
