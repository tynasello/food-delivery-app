import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../../src/app.module'
import { PrismaService } from '../../src/prisma.service'
import { SIGNUP_MUTATION } from '../auth/auth.helper'
import { CREATE_CATEGORY_MUTATION } from '../categories/categories.helper'
import { CREATE_FOOD_MUTATION } from '../food/food.helper'
import {
  DELETE_USER,
  GET_USER,
  UPDATE_USER,
  UPDATE_USER_ADD_FOOD_TO_CART_MUTATION,
  UPDATE_USER_REMOVE_FOOD_FROM_CART_MUTATION,
} from './users.helper'

//

describe('Auth (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService

  let at = ''

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = app.get(PrismaService)

    await app.init()

    //

    if (process.env.DB_MODE === 'TEST') {
      await prisma.$queryRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
    }

    const createUserInput = {
      username: 'Mock Username',
      password: 'Mock Password',
      address: 'Mock Address',
    }
    const createCategoryInput = {
      name: 'Sushi',
    }
    const createFoodInput = {
      name: 'Mock roll',
      restaurant: 'Saku',
      price: 8.5,
      categoryId: 1,
    }
    // create user
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: SIGNUP_MUTATION,
        variables: { createUserInput },
      })
      .expect(200)
      .expect(({ body }) => {
        at = body?.data?.signup.at
      })
    // create category
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: CREATE_CATEGORY_MUTATION,
        variables: { createCategoryInput: createCategoryInput },
      })
    // add food to category
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: CREATE_FOOD_MUTATION,
        variables: { createFoodInput: createFoodInput },
      })
  })

  afterAll(async () => {
    if (process.env.DB_MODE === 'TEST') {
      await prisma.$queryRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
    }
    await prisma.$disconnect()
    await app.close()
  })

  it('should be defined', () => {
    expect(app).toBeDefined()
  })

  //

  describe('get user', () => {
    it('should get a user', async () => {
      const getUserExpectedResponse = {
        id: 1,
        username: 'Mock Username',
        address: 'Mock Address',
        cart: [],
        cartCount: '{}',
      }
      await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', `Bearer ${at}`)
        .send({
          query: GET_USER,
        })
        .expect(200)
        .expect(({ body }) => {
          const signupResponse = body?.data?.getUser
          expect(signupResponse).toBeDefined()
          expect(signupResponse).toEqual(getUserExpectedResponse)
        })
    })
    it('should throw error because of invalid at', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', `Bearer ${'Mock Invalid at'}`)
        .send({
          query: GET_USER,
        })
        .expect(200)
        .expect(({ body }) => {
          const errorMsg = body?.errors[0]?.message
          const errorCode = body?.errors[0]?.extensions.code
          expect(errorMsg).toEqual(expect.any(String))
          expect(errorCode).toEqual('UNAUTHENTICATED')
        })
    })
  })

  //

  describe('update user', () => {
    it("should update a user's information", async () => {
      const updateUserInput = {
        address: 'New Mock Address',
      }
      const updateUserExpectedResponse = {
        id: 1,
        username: 'Mock Username',
        address: updateUserInput.address,
        cart: [],
        cartCount: '{}',
      }
      await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', `Bearer ${at}`)
        .send({
          query: UPDATE_USER,
          variables: { updateUserInput },
        })
        .expect(200)
        .expect(({ body }) => {
          const updateResponse = body?.data?.updateUser
          expect(updateResponse).toBeDefined()
          expect(updateResponse).toEqual(updateUserExpectedResponse)
        })
    })
  })

  //

  describe('update user add food to cart', () => {
    it('should add a food item to users cart', async () => {
      const updateCartInput = {
        foodId: 1,
      }
      const updateCartExpectedResponse = {
        id: 1,
        username: 'Mock Username',
        address: 'New Mock Address',
        cart: [{ name: 'Mock roll' }],
        cartCount: JSON.stringify({ '1': 1 }),
      }
      await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', `Bearer ${at}`)
        .send({
          query: UPDATE_USER_ADD_FOOD_TO_CART_MUTATION,
          variables: { updateCartInput },
        })
        .expect(200)
        .expect(({ body }) => {
          const updateResponse = body?.data?.updateUserAddFoodToCart
          expect(updateResponse).toBeDefined()
          expect(updateResponse).toEqual(updateCartExpectedResponse)
        })
    })
    it('should fail to add food to cart because of unknown food', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', `Bearer ${at}`)
        .send({
          query: UPDATE_USER_ADD_FOOD_TO_CART_MUTATION,
          variables: { updateCartInput: { foodId: 0 } },
        })
        .expect(200)
        .expect(({ body }) => {
          const errorMsg = body?.errors[0]?.message
          const errorCode = body?.errors[0]?.extensions.code
          expect(errorMsg).toEqual(expect.any(String))
          expect(errorCode).toEqual('BAD_USER_INPUT')
        })
    })
  })

  //

  describe('update user remove food from cart', () => {
    it("should remove a food item from user's cart", async () => {
      const updateCartInput = {
        foodId: 1,
      }
      const updateCartExpectedResponse = {
        id: 1,
        username: 'Mock Username',
        address: 'New Mock Address',
        cart: [],
        cartCount: '{}',
      }
      await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', `Bearer ${at}`)
        .send({
          query: UPDATE_USER_REMOVE_FOOD_FROM_CART_MUTATION,
          variables: { updateCartInput },
        })
        .expect(200)
        .expect(({ body }) => {
          const updateResponse = body?.data?.updateUserRemoveFoodFromCart
          expect(updateResponse).toBeDefined()
          expect(updateResponse).toEqual(updateCartExpectedResponse)
        })
    })
    it("should fail to remove food from user's cart because food not in cart", async () => {
      const updateCartInput = {
        foodId: 1,
      }
      await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', `Bearer ${at}`)
        .send({
          query: UPDATE_USER_REMOVE_FOOD_FROM_CART_MUTATION,
          variables: { updateCartInput },
        })
        .expect(200)
        .expect(({ body }) => {
          const errorMsg = body?.errors[0]?.message
          const errorCode = body?.errors[0]?.extensions.code
          expect(errorMsg).toEqual(expect.any(String))
          expect(errorCode).toEqual('BAD_USER_INPUT')
        })
    })
  })

  //

  describe('remove user', () => {
    it('should remove a user from db', async () => {
      const deleteUserExpectedResponse = {
        id: 1,
        username: 'Mock Username',
        address: 'New Mock Address',
        cart: [],
        cartCount: '{}',
      }
      // remove user from db
      await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', `Bearer ${at}`)
        .send({
          query: DELETE_USER,
        })
        .expect(200)
        .expect(({ body }) => {
          const deleteResponse = body?.data?.deleteUser
          expect(deleteResponse).toBeDefined()
          expect(deleteResponse).toEqual(deleteUserExpectedResponse)
        })
      // verify user has been removed
      await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', `Bearer ${at}`)
        .send({
          query: GET_USER,
        })
        .expect(200)
        .expect(({ body }) => {
          const errorMsg = body?.errors[0]?.message
          const errorCode = body?.errors[0]?.extensions.code
          expect(errorMsg).toEqual(expect.any(String))
          expect(errorCode).toEqual('BAD_USER_INPUT')
        })
    })
  })
})
