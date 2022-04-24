import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FoodItem, SortBy } from '.'
import { Food, useGetFoodsQuery } from '../../../graphql/generated/schema'

interface Props {
  currentCategory: number | null
}

const Foods = ({ currentCategory }: Props) => {
  const [filteredFood, setFilteredFood] = useState<Food[] | null | undefined>(null)
  const [sortBy, setSortBy] = useState<string>('None')

  const { data } = useGetFoodsQuery()
  const food = data?.getFoods

  useEffect(() => {
    setFilteredFood(
      !currentCategory
        ? food
            ?.filter(() => true)
            .sort((a, b) => {
              if (sortBy === 'asc') return a.price - b.price
              if (sortBy === 'desc') return b.price - a.price
              return 0
            })
        : food
            ?.filter((foodItem) => {
              return foodItem.categoryId === currentCategory
            })
            .sort((a, b) => {
              if (sortBy === 'asc') return a.price - b.price
              if (sortBy === 'desc') return b.price - a.price
              return 0
            })
    )
  }, [food, currentCategory, sortBy])

  return (
    <>
      <SortBy sortBy={sortBy} setSortBy={setSortBy} />

      <FoodContainer>
        {(filteredFood ?? food)?.map((foodItem, i: number) => (
          <FoodItem key={i} foodItem={foodItem} />
        ))}
      </FoodContainer>
    </>
  )
}

export default Foods

const FoodContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  justify-content: center;
  margin: 3rem;
`
