import { CircularProgress } from '@mui/material'
import styled from 'styled-components'
import { Text } from './typography'

const Loading = () => {
  return (
    <LoadingContainer>
      <CircularProgress size={100} thickness={1} sx={{ marginBottom: '2rem' }} />
      <Text type="Header" sx={{ color: null }}>
        Loading...
      </Text>
    </LoadingContainer>
  )
}

export default Loading

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
