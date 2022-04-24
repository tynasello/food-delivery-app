import { CircularProgress } from '@mui/material'
import styled from 'styled-components'
import { Text } from './typography'

const Error = () => {
  return (
    <LoadingContainer>
      <CircularProgress size={100} thickness={1} sx={{ marginBottom: '2rem' }} />
      <Text type="Header" sx={{ color: null }}>
        Error querying data...
      </Text>
    </LoadingContainer>
  )
}

export default Error

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`
