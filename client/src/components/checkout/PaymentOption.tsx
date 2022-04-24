import { CardMedia } from '@mui/material'
import { useFormikContext } from 'formik'
import { motion } from 'framer-motion'
import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { getOptionImage } from '../../helpers'
import { theme } from '../../theme/GlobalStyle'
import { Text } from '../shared/typography'

interface Props {
  optionName: string
  selected: string
  setSelected: Dispatch<SetStateAction<string>>
}

const PaymentOption = ({ optionName, selected, setSelected }: Props) => {
  const selectedOptionStyle = {
    backgroundColor: '#D6EAF8',
  }

  const { setFieldValue } = useFormikContext()

  return (
    <motion.button
      style={{ backgroundColor: 'inherit' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="button"
    >
      <OptionContainer
        style={selected === optionName ? selectedOptionStyle : {}}
        onClick={() => {
          if (selected === optionName) {
            setSelected('')
            setFieldValue('paymentMethod', '')
          } else {
            setSelected(optionName)
            setFieldValue('paymentMethod', optionName)
          }
        }}
      >
        <CardMedia
          component="img"
          image={getOptionImage(optionName)}
          alt="payment method"
          sx={{ height: '30px', width: '30px' }}
        />
        <Text type="SubTitle" color="text.secondary">
          {optionName}
        </Text>
      </OptionContainer>
    </motion.button>
  )
}

export default PaymentOption

const OptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${theme.palette.primary.main};
  margin: 0.7rem 0;
  padding: 1rem 3rem;
  border-radius: 2rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transition: background-color 0.2s linear;
  transition: box-shadow 0.2s linear;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px,
      rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
      rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
`
