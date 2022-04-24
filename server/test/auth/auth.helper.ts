export const SIGNUP_MUTATION = `mutation Signup($createUserInput: CreateUserDto!) {
  signup(createUserInput: $createUserInput) {
    id
    username
    address
    cart {
      name
    }
    cartCount
    at
    rt
  }
}
`

export const LOGIN_MUTATION = `mutation Login($loginInput: LoginDto!) {
  login(loginInput: $loginInput) {
    id
    username
    address
    cart {
      name
    }
    cartCount
    at
    rt
  }
}
`

export const LOGOUT_MUTATION = `mutation Logout {
  logout {
    username
  }
}
`

export const REFRESH_TOKENS_MUTATION = `mutation RefreshTokens {
  refreshTokens {
    at
  }
}
`
