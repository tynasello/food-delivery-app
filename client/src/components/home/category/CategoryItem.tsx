import { Card, CardContent, CardMedia } from '@mui/material'
import { motion } from 'framer-motion'
import { getImage } from '../../../helpers'
import { Text } from '../../shared/typography'

interface Props {
  setCurrentCategory: (categoryId: number | null) => void
  categoryId: number | null
  categoryName: string
}

const CategoryItem = ({ setCurrentCategory, categoryId, categoryName }: Props) => {
  const handleChangeCategory = (categoryId: number | null) => {
    setCurrentCategory(categoryId)
  }

  return (
    <motion.button style={{ backgroundColor: 'inherit' }} whileHover={{ scale: 1.05 }}>
      <Card
        sx={{
          width: 200,
          cursor: 'pointer',
          margin: '1rem',
          borderRadius: '2rem',
          boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
        }}
        onClick={() => {
          handleChangeCategory(categoryId)
        }}
      >
        <CardMedia component="img" height="150" image={getImage(categoryName)} alt="category" />
        <CardContent>
          <Text type="SubTitle" color="" align="center">
            {categoryName}
          </Text>
        </CardContent>
      </Card>
    </motion.button>
  )
}

export default CategoryItem
