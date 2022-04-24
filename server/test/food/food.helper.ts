export const CREATE_FOOD_MUTATION = `mutation CreateFood($createFoodInput: CreateFoodDto!) {
  createFood(createFoodInput: $createFoodInput) {
    name
    restaurant
    price
    id
    categoryId
    category {
      name
    }
  }
}
`

export const GET_FOODS = `query GetFoods {
  getFoods {
    id
    name
    restaurant
    price
    categoryId
    category {
      name
    }
  }
}
`

export const GET_FOOD = `query GetFood($getFoodId: Int!) {
  getFood(foodId: $getFoodId) {
    id
    name
    restaurant
    price
    categoryId
    category {
      name
    }
  }
}
`

export const DELETE_FOOD = `mutation DeleteFood($foodId: Int!) {
  deleteFood(foodId: $foodId) {
    id
    name
    restaurant
    categoryId
    price
  }
}
`
