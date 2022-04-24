export const GET_USER = `query GetUser {
  getUser {
    id
    username
    address
    cartCount
    cart {
      name
    }
  }
}
`

export const UPDATE_USER = `mutation UpdateUser($updateUserInput: UpdateUserDto!) {
  updateUser(updateUserInput: $updateUserInput) {
    id
    username
    address
    cartCount
    cart {
      name
    }
  }
}
`

export const UPDATE_USER_ADD_FOOD_TO_CART_MUTATION = `mutation UpdateUserAddFoodToCart($updateCartInput: UpdateUserCartDto!) {
  updateUserAddFoodToCart(updateCartInput: $updateCartInput) {
    id
    username
    address
    cartCount
    cart {
      name
    }
  }
}
`

export const UPDATE_USER_REMOVE_FOOD_FROM_CART_MUTATION = `mutation UpdateUserRemoveFoodFromCart($updateCartInput: UpdateUserCartDto!) {
  updateUserRemoveFoodFromCart(updateCartInput: $updateCartInput) {
    id
    username
    address
    cartCount
    cart {
      name
    }
  }
}
`

export const DELETE_USER = `mutation DeleteUser {
  deleteUser {
    id
    username
    address
    cartCount
    cart {
      name
    }
  }
}

`
