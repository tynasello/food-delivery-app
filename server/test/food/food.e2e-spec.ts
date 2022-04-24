import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../../src/app.module'
import { PrismaService } from '../../src/prisma.service'
import { CREATE_CATEGORY_MUTATION } from '../categories/categories.helper'
import {
  CREATE_FOOD_MUTATION,
  DELETE_FOOD,
  GET_FOOD,
  GET_FOODS,
} from './food.helper'

//

describe('Food (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = app.get(PrismaService)

    await app.init()
  })

  afterAll(async () => {
    await prisma.$disconnect()
    await app.close()
  })

  beforeEach(async () => {
    if (process.env.DB_MODE === 'TEST') {
      await prisma.$queryRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
      await prisma.$queryRaw`TRUNCATE TABLE "Food" RESTART IDENTITY CASCADE;`
    }
  })

  it('should be defined', () => {
    expect(app).toBeDefined()
  })

  //

  describe('creating a food item', () => {
    it('should create a food item', async () => {
      const createCategoryInput = {
        name: 'Sushi',
      }
      const createFoodInput = {
        name: 'Mock roll',
        restaurant: 'Saku',
        price: 8.5,
        categoryId: 1,
      }

      // create category
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: CREATE_CATEGORY_MUTATION,
          variables: { createCategoryInput: createCategoryInput },
        })
        .expect(200)
        .expect(({ body }) => {
          const category = body?.data?.createCategory
          expect(category).toBeDefined()
          expect(category).toEqual({ id: 1, ...createCategoryInput, food: [] })
        })
      // add food to category
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: CREATE_FOOD_MUTATION,
          variables: { createFoodInput: createFoodInput },
        })
        .expect(200)
        .expect(({ body }) => {
          const food = body?.data?.createFood
          expect(food).toBeDefined()
          expect(food).toEqual({
            id: expect.any(Number),
            ...createFoodInput,
            category: { name: createCategoryInput.name },
          })
        })
      // get food item
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: GET_FOOD,
          variables: { getFoodId: 1 },
        })
        .expect(200)
        .expect(({ body }) => {
          const food = body?.data?.getFood
          expect(food).toBeDefined()
          expect(food).toEqual({
            id: 1,
            ...createFoodInput,
            category: { name: createCategoryInput.name },
          })
        })
    })
    it('should throw error because of invalid input', async () => {
      const createFoodInvalidInput = {
        name: null,
      }
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: CREATE_FOOD_MUTATION,
          variables: { createFoodInput: createFoodInvalidInput },
        })
        .expect(400)
        .expect(({ body }) => {
          const errorMsg = body?.errors[0]?.message
          expect(errorMsg).toEqual(expect.any(String))
        })
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: GET_FOODS,
        })
        .expect(200)
        .expect(({ body }) => {
          const food = body?.data?.getFoods
          expect(food).toBeDefined()
          expect(food).toEqual([])
        })
    })
  })

  //

  describe('getting all food', () => {
    it('should return all food items', async () => {
      const createCategoryInput = {
        name: 'Sushi',
      }
      const createFoodInput = {
        name: 'Mock roll',
        restaurant: 'Saku',
        price: 8.5,
        categoryId: 1,
      }
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
      // get all food
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: GET_FOODS,
        })
        .expect(200)
        .expect(({ body }) => {
          const foodItems = body?.data?.getFoods
          expect(foodItems).toBeDefined()
          expect(foodItems).toEqual([
            {
              id: 1,
              ...createFoodInput,
              category: { name: createCategoryInput.name },
            },
          ])
        })
    })
  })

  //

  describe('getting one food item by id', () => {
    it('should get a food item by id', async () => {
      const createCategoryInput = {
        name: 'Sushi',
      }
      const createFoodInput = {
        name: 'Mock roll',
        restaurant: 'Saku',
        price: 8.5,
        categoryId: 1,
      }
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
      // get food item
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: GET_FOOD,
          variables: { getFoodId: 1 },
        })
        .expect(200)
        .expect(({ body }) => {
          const foodItems = body?.data?.getFood
          expect(foodItems).toBeDefined()
          expect(foodItems).toEqual({
            id: 1,
            ...createFoodInput,
            category: { name: createCategoryInput.name },
          })
        })
    })
    it('should fail to get a food item because of invalid id', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: GET_FOOD,
          variables: { getFoodId: 0 },
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

  describe('remove', () => {
    it('should remove a food item by id', async () => {
      const createCategoryInput = {
        name: 'Sushi',
      }
      const createFoodInput = {
        name: 'Mock roll',
        restaurant: 'Saku',
        price: 8.5,
        categoryId: 1,
      }
      // create category
      await request(app.getHttpServer()).post('/graphql').send({
        query: CREATE_CATEGORY_MUTATION,
        variables: { createCategoryInput },
      })
      // create food item and add to category
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: CREATE_FOOD_MUTATION,
          variables: { createFoodInput: createFoodInput },
        })
      // delete a food item
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: DELETE_FOOD,
          variables: { foodId: 1 },
        })
        .expect(200)
        .expect(({ body }) => {
          const foodItem = body?.data?.deleteFood
          expect(foodItem).toBeDefined()
        })
      // food should be empty
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: GET_FOODS,
        })
        .expect(200)
        .expect(({ body }) => {
          const food = body?.data?.getFoods
          expect(food).toBeDefined()
          expect(food).toEqual([])
        })
    })
    it('should fail to remove a category because of invalid id', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: DELETE_FOOD,
          variables: { foodId: 0 },
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
