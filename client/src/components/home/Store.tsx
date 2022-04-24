import { useState } from 'react'
import { Categories } from './category'
import { Foods } from './food'

const Store = () => {
  const [currentCategory, setCurrentCategory] = useState<number | null>(null)

  return (
    <>
      <Categories setCurrentCategory={setCurrentCategory} />
      <Foods currentCategory={currentCategory} />
    </>
  )
}

export default Store
