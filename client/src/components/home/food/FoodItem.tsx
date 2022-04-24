import { useMutation } from '@apollo/client'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Avatar, Box, Card, CardActions, CardContent, CardMedia, IconButton } from '@mui/material'
import { motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../context'
import {
  Food,
  GetUserDocument,
  UpdateUserAddFoodToCartDocument,
  UpdateUserRemoveFoodFromCartDocument,
} from '../../../graphql/generated/schema'
import { getImage } from '../../../helpers'
import { Text } from '../../shared/typography'

interface Props {
  foodItem: Food
}

const FoodItem = ({ foodItem }: Props) => {
  const { userContextValue: user } = useContext(UserContext)

  const [addToCart] = useMutation(UpdateUserAddFoodToCartDocument, {
    refetchQueries: [{ query: GetUserDocument }],
  })
  const [removeFromCart] = useMutation(UpdateUserRemoveFoodFromCartDocument, {
    refetchQueries: [{ query: GetUserDocument }],
  })

  const [isOneAdded, setIsOneAdded] = useState(
    JSON.parse(user?.cartCount || '{}')[foodItem.id] ? true : false
  )

  const [isCartDisabled, setIsCartDisaled] = useState(false)

  useEffect(() => {
    setIsOneAdded(JSON.parse(user?.cartCount || '{}')[foodItem.id] ? true : false)
  }, [user, isOneAdded])

  const handleAddItem = async (foodId: number) => {
    setIsCartDisaled(true)
    try {
      await addToCart({
        variables: {
          updateCartInput: {
            foodId,
          },
        },
      })
    } catch (e) {
      console.error(e)
    }

    setIsCartDisaled(false)
  }

  const handleRemoveItem = async (foodId: number) => {
    setIsCartDisaled(true)
    try {
      await removeFromCart({
        variables: {
          updateCartInput: {
            foodId,
          },
        },
      })
    } catch (e) {
      console.error(e)
    }

    setIsCartDisaled(false)
  }

  return (
    <motion.div
      animate={{
        scale: [1, 1.03, 1],
      }}
    >
      <Card
        sx={{
          maxWidth: 345,
          borderRadius: '1rem',
          boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
        }}
      >
        <CardMedia component="img" height="194" image={getImage(foodItem.id)} alt={foodItem.name} />
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Text type="SubTitle" color="">
              {foodItem.name}
            </Text>
            <Text type="Small" color="text.secondary">
              {foodItem.restaurant}
            </Text>
          </Box>
          {JSON.parse(user?.cartCount || '{}')[foodItem.id] && (
            <Avatar
              sx={{
                position: 'relative',
                top: '0',
                bgcolor: '#E74C3C',
                width: '2rem',
                height: '2rem',
              }}
            >
              <Text type="Small" color="#ECF0F1">
                {JSON.parse(user?.cartCount || '{}')[foodItem.id]}
              </Text>
            </Avatar>
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between', margin: '1rem' }}>
          <Box>
            <Text type="Small" color="text.secondary">
              Price:
            </Text>
            <Text type="Main" color="text.primary">
              {`${foodItem.price} $`}
            </Text>
          </Box>
          <Box>
            {isOneAdded && (
              <IconButton
                onClick={() => handleRemoveItem(foodItem.id)}
                disabled={isCartDisabled || !isOneAdded}
              >
                <RemoveIcon />
              </IconButton>
            )}
            <IconButton onClick={() => handleAddItem(foodItem.id)} disabled={isCartDisabled}>
              <AddIcon />
            </IconButton>
          </Box>
        </CardActions>
      </Card>{' '}
    </motion.div>
  )
}

export default FoodItem
