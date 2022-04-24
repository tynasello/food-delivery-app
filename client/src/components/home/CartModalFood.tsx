import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { UserContext } from '../../context/UserContext'
import { Food } from '../../graphql/generated/schema'
import { Text } from '../shared/typography'
import { FoodItem } from './food'

interface Props {
  food: Food[]
  isCartEmpty: boolean
  setIsCartEmpty: (bool: boolean) => void
}

const CartModalFood = ({ food, isCartEmpty, setIsCartEmpty }: Props) => {
  const { userContextValue: user } = useContext(UserContext)

  const cart = JSON.parse(user?.cartCount || '{}')

  const [filteredFood, setFilteredFood] = useState(
    food?.filter((foodItem) => Object.keys(cart).includes(foodItem.id.toString()))
  )

  useEffect(() => {
    if (food && cart)
      setFilteredFood(food.filter((foodItem) => Object.keys(cart).includes(foodItem.id.toString())))

    setIsCartEmpty(Object.keys(cart).length === 0)
  }, [user])

  return isCartEmpty ? (
    <Text type="SubTitle" color="" align="center" sx={{ paddingTop: '3rem' }}>
      Cart is empty 😕
    </Text>
  ) : (
    <FoodContainer>
      {filteredFood?.map((foodItem, i: number) => (
        <FoodItem key={i} foodItem={foodItem} />
      ))}
    </FoodContainer>
  )
}

export default CartModalFood

const FoodContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-row-gap: 2rem;
  justify-content: center;
`
