import styled from 'styled-components'
import { CategoryItem } from '.'
import { useGetCategoriesQuery } from '../../../graphql/generated/schema'
import { Error, Loading } from '../../shared'
import { Text } from '../../shared/typography'

interface Props {
  setCurrentCategory: React.Dispatch<React.SetStateAction<number | null>>
}

const Categories = ({ setCurrentCategory }: Props) => {
  const { loading, error, data } = useGetCategoriesQuery()
  const categories = data?.getCategories

  if (loading) return <Loading />
  if (error || !categories) return <Error />

  return (
    <CategoriesContainer>
      <Text type="Title" color="white" align="center">
        BROWSE BY CATEGORY 🕵️
      </Text>

      <CategoryCardsContainer>
        <CategoryItem
          setCurrentCategory={setCurrentCategory}
          categoryId={null}
          categoryName={'Any'}
        />

        {categories?.map((category, i) => (
          <CategoryItem
            key={i}
            setCurrentCategory={setCurrentCategory}
            categoryId={category.id}
            categoryName={category.name}
          />
        ))}
      </CategoryCardsContainer>
    </CategoriesContainer>
  )
}

export default Categories

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  margin: 2rem 8vw 4rem 8vw;
  padding: 4rem 0;
  border-radius: 2rem;
  background: linear-gradient(
    90deg,
    rgba(35, 33, 79, 1) 0%,
    rgba(81, 75, 178, 1) 49%,
    rgba(44, 40, 99, 1) 100%
  );

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`
const CategoryCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem 0;
`
