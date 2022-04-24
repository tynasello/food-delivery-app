export const CREATE_CATEGORY_MUTATION = `mutation CreateCategory($createCategoryInput: CreateCategoryDto!) {
  createCategory(createCategoryInput: $createCategoryInput) {
    id
    name
    food{
        name
    }
  }
}
`

export const GET_CATEGORIES = `query GetCategories {
  getCategories {
    id
    name
    food {
        name
    }
  }
}
`

export const GET_CATEGORY = `query GetCategory($categoryId: Int!) {
  getCategory(categoryId: $categoryId) {
    id
    name
    food {
      name
    }
  }
}
`

export const DELETE_CATEGORY = `mutation DeleteCategory($categoryId: Int!) {
  deleteCategory(categoryId: $categoryId) {
    id
    name
    food{
      name
    }
  }
}
`
