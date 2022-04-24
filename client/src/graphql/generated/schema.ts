import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Category = {
  __typename?: 'Category';
  food?: Maybe<Array<Food>>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type CreateCategoryDto = {
  name: Scalars['String'];
};

export type CreateFoodDto = {
  categoryId: Scalars['Int'];
  name: Scalars['String'];
  price: Scalars['Float'];
  restaurant: Scalars['String'];
};

export type CreateUserDto = {
  address: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Food = {
  __typename?: 'Food';
  category: Category;
  categoryId: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
  price: Scalars['Float'];
  restaurant: Scalars['String'];
};

export type LoginDto = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginSignupResponse = {
  __typename?: 'LoginSignupResponse';
  address: Scalars['String'];
  at: Scalars['String'];
  cart?: Maybe<Array<Food>>;
  cartCount: Scalars['String'];
  id: Scalars['Int'];
  rt: Scalars['String'];
  username: Scalars['String'];
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createFood: Food;
  deleteCategory: Category;
  deleteFood: Food;
  deleteUser: User;
  login: LoginSignupResponse;
  logout: LogoutResponse;
  refreshTokens: RefreshResponse;
  signup: LoginSignupResponse;
  updateUser: User;
  updateUserAddFoodToCart: User;
  updateUserRemoveFoodFromCart: User;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryDto;
};


export type MutationCreateFoodArgs = {
  createFoodInput: CreateFoodDto;
};


export type MutationDeleteCategoryArgs = {
  categoryId: Scalars['Int'];
};


export type MutationDeleteFoodArgs = {
  foodId: Scalars['Int'];
};


export type MutationLoginArgs = {
  loginInput: LoginDto;
};


export type MutationSignupArgs = {
  createUserInput: CreateUserDto;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserDto;
};


export type MutationUpdateUserAddFoodToCartArgs = {
  updateCartInput: UpdateUserCartDto;
};


export type MutationUpdateUserRemoveFoodFromCartArgs = {
  updateCartInput: UpdateUserCartDto;
};

export type Query = {
  __typename?: 'Query';
  getCategories: Array<Category>;
  getCategory: Category;
  getFood: Food;
  getFoods: Array<Food>;
  getUser: User;
};


export type QueryGetCategoryArgs = {
  categoryId: Scalars['Int'];
};


export type QueryGetFoodArgs = {
  foodId: Scalars['Int'];
};

export type RefreshResponse = {
  __typename?: 'RefreshResponse';
  at: Scalars['String'];
};

export type UpdateUserCartDto = {
  foodId?: InputMaybe<Scalars['Int']>;
};

export type UpdateUserDto = {
  address?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  address: Scalars['String'];
  cart?: Maybe<Array<Food>>;
  cartCount: Scalars['String'];
  id: Scalars['Int'];
  username: Scalars['String'];
};

export type CreateCategoryMutationVariables = Exact<{
  createCategoryInput: CreateCategoryDto;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: number, name: string, food?: Array<{ __typename?: 'Food', name: string }> | null } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginDto;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginSignupResponse', id: number, username: string, address: string, cartCount: string, at: string, rt: string, cart?: Array<{ __typename?: 'Food', name: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutResponse', username: string } };

export type RefreshTokensMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokensMutation = { __typename?: 'Mutation', refreshTokens: { __typename?: 'RefreshResponse', at: string } };

export type SignupMutationVariables = Exact<{
  createUserInput: CreateUserDto;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'LoginSignupResponse', id: number, username: string, address: string, cartCount: string, at: string, rt: string, cart?: Array<{ __typename?: 'Food', name: string }> | null } };

export type UpdateUserAddFoodToCartMutationVariables = Exact<{
  updateCartInput: UpdateUserCartDto;
}>;


export type UpdateUserAddFoodToCartMutation = { __typename?: 'Mutation', updateUserAddFoodToCart: { __typename?: 'User', id: number, username: string, address: string, cartCount: string, cart?: Array<{ __typename?: 'Food', name: string }> | null } };

export type UpdateUserRemoveFoodFromCartMutationVariables = Exact<{
  updateCartInput: UpdateUserCartDto;
}>;


export type UpdateUserRemoveFoodFromCartMutation = { __typename?: 'Mutation', updateUserRemoveFoodFromCart: { __typename?: 'User', id: number, username: string, address: string, cartCount: string, cart?: Array<{ __typename?: 'Food', name: string }> | null } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', id: number, name: string, food?: Array<{ __typename?: 'Food', name: string }> | null }> };

export type GetFoodsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFoodsQuery = { __typename?: 'Query', getFoods: Array<{ __typename?: 'Food', id: number, name: string, restaurant: string, price: number, categoryId: number, category: { __typename?: 'Category', id: number, name: string } }> };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: number, username: string, address: string, cartCount: string, cart?: Array<{ __typename?: 'Food', id: number, name: string, categoryId: number, price: number, restaurant: string, category: { __typename?: 'Category', id: number, name: string } }> | null } };


export const CreateCategoryDocument = gql`
    mutation CreateCategory($createCategoryInput: CreateCategoryDto!) {
  createCategory(createCategoryInput: $createCategoryInput) {
    id
    name
    food {
      name
    }
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      createCategoryInput: // value for 'createCategoryInput'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginDto!) {
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
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    username
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RefreshTokensDocument = gql`
    mutation RefreshTokens {
  refreshTokens {
    at
  }
}
    `;
export type RefreshTokensMutationFn = Apollo.MutationFunction<RefreshTokensMutation, RefreshTokensMutationVariables>;

/**
 * __useRefreshTokensMutation__
 *
 * To run a mutation, you first call `useRefreshTokensMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokensMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokensMutation, { data, loading, error }] = useRefreshTokensMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokensMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokensMutation, RefreshTokensMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokensMutation, RefreshTokensMutationVariables>(RefreshTokensDocument, options);
      }
export type RefreshTokensMutationHookResult = ReturnType<typeof useRefreshTokensMutation>;
export type RefreshTokensMutationResult = Apollo.MutationResult<RefreshTokensMutation>;
export type RefreshTokensMutationOptions = Apollo.BaseMutationOptions<RefreshTokensMutation, RefreshTokensMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($createUserInput: CreateUserDto!) {
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
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const UpdateUserAddFoodToCartDocument = gql`
    mutation UpdateUserAddFoodToCart($updateCartInput: UpdateUserCartDto!) {
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
    `;
export type UpdateUserAddFoodToCartMutationFn = Apollo.MutationFunction<UpdateUserAddFoodToCartMutation, UpdateUserAddFoodToCartMutationVariables>;

/**
 * __useUpdateUserAddFoodToCartMutation__
 *
 * To run a mutation, you first call `useUpdateUserAddFoodToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserAddFoodToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserAddFoodToCartMutation, { data, loading, error }] = useUpdateUserAddFoodToCartMutation({
 *   variables: {
 *      updateCartInput: // value for 'updateCartInput'
 *   },
 * });
 */
export function useUpdateUserAddFoodToCartMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserAddFoodToCartMutation, UpdateUserAddFoodToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserAddFoodToCartMutation, UpdateUserAddFoodToCartMutationVariables>(UpdateUserAddFoodToCartDocument, options);
      }
export type UpdateUserAddFoodToCartMutationHookResult = ReturnType<typeof useUpdateUserAddFoodToCartMutation>;
export type UpdateUserAddFoodToCartMutationResult = Apollo.MutationResult<UpdateUserAddFoodToCartMutation>;
export type UpdateUserAddFoodToCartMutationOptions = Apollo.BaseMutationOptions<UpdateUserAddFoodToCartMutation, UpdateUserAddFoodToCartMutationVariables>;
export const UpdateUserRemoveFoodFromCartDocument = gql`
    mutation UpdateUserRemoveFoodFromCart($updateCartInput: UpdateUserCartDto!) {
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
    `;
export type UpdateUserRemoveFoodFromCartMutationFn = Apollo.MutationFunction<UpdateUserRemoveFoodFromCartMutation, UpdateUserRemoveFoodFromCartMutationVariables>;

/**
 * __useUpdateUserRemoveFoodFromCartMutation__
 *
 * To run a mutation, you first call `useUpdateUserRemoveFoodFromCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserRemoveFoodFromCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserRemoveFoodFromCartMutation, { data, loading, error }] = useUpdateUserRemoveFoodFromCartMutation({
 *   variables: {
 *      updateCartInput: // value for 'updateCartInput'
 *   },
 * });
 */
export function useUpdateUserRemoveFoodFromCartMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserRemoveFoodFromCartMutation, UpdateUserRemoveFoodFromCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserRemoveFoodFromCartMutation, UpdateUserRemoveFoodFromCartMutationVariables>(UpdateUserRemoveFoodFromCartDocument, options);
      }
export type UpdateUserRemoveFoodFromCartMutationHookResult = ReturnType<typeof useUpdateUserRemoveFoodFromCartMutation>;
export type UpdateUserRemoveFoodFromCartMutationResult = Apollo.MutationResult<UpdateUserRemoveFoodFromCartMutation>;
export type UpdateUserRemoveFoodFromCartMutationOptions = Apollo.BaseMutationOptions<UpdateUserRemoveFoodFromCartMutation, UpdateUserRemoveFoodFromCartMutationVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  getCategories {
    id
    name
    food {
      name
    }
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetFoodsDocument = gql`
    query GetFoods {
  getFoods {
    id
    name
    restaurant
    price
    categoryId
    category {
      id
      name
    }
  }
}
    `;

/**
 * __useGetFoodsQuery__
 *
 * To run a query within a React component, call `useGetFoodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFoodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFoodsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFoodsQuery(baseOptions?: Apollo.QueryHookOptions<GetFoodsQuery, GetFoodsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFoodsQuery, GetFoodsQueryVariables>(GetFoodsDocument, options);
      }
export function useGetFoodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFoodsQuery, GetFoodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFoodsQuery, GetFoodsQueryVariables>(GetFoodsDocument, options);
        }
export type GetFoodsQueryHookResult = ReturnType<typeof useGetFoodsQuery>;
export type GetFoodsLazyQueryHookResult = ReturnType<typeof useGetFoodsLazyQuery>;
export type GetFoodsQueryResult = Apollo.QueryResult<GetFoodsQuery, GetFoodsQueryVariables>;
export const GetUserDocument = gql`
    query GetUser {
  getUser {
    id
    username
    address
    cartCount
    cart {
      id
      name
      category {
        id
        name
      }
      categoryId
      price
      restaurant
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;