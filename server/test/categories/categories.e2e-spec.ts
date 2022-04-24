import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../../src/app.module'
import { PrismaService } from '../../src/prisma.service'
import { CREATE_FOOD_MUTATION } from '../food/food.helper'
import {
  CREATE_CATEGORY_MUTATION,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  GET_CATEGORY,
} from './categories.helper'

//

describe('Categories (e2e)', () => {
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

  describe('creating a category', () => {
    it('should create a category', async () => {
      const createCategoryInput = {
        name: 'Sushi',
      }
      const expectedResponse = {
        id: 1,
        name: 'Sushi',
        food: [],
      }
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
          expect(category).toEqual(expectedResponse)
        })
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: GET_CATEGORIES,
        })
        .expect(200)
        .expect(({ body }) => {
          const categories = body?.data?.getCategories
          expect(categories).toBeDefined()
          expect(categories).toEqual([
            {
              id: expect.any(Number),
              food: [],
              ...createCategoryInput,
            },
          ])
        })
    })
    it('should throw error because of invalid input', async () => {
      const createCategoryInputInvalid = {
        name: null,
      }
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: CREATE_CATEGORY_MUTATION,
          variables: { createCategoryInput: createCategoryInputInvalid },
        })
        .expect(400)
        .expect(({ body }) => {
          const errorMsg = body?.errors[0]?.message
          expect(errorMsg).toEqual(expect.any(String))
        })
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: GET_CATEGORIES,
        })
        .expect(200)
        .expect(({ body }) => {
          const categories = body?.data?.getCategories
          expect(categories).toBeDefined()
          expect(categories).toEqual([])
        })
    })
  })

  //

  describe('getting all categories', () => {
    it('should return all categories', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: GET_CATEGORIES,
        })
        .expect(200)
        .expect(({ body }) => {
          const categories = body?.data?.getCategories
          expect(categories).toBeDefined()
          expect(categories).toEqual([])
        })
    })
  })

  //

  describe('getting one category by id', () => {
    it('should get a category by id', async () => {
      const createCategoryInput = {
        name: 'Sushi',
      }
      const createFoodInput = {
        name: 'Mock roll',
        restaurant: 'Saku',
        price: 8.5,
        categoryId: 1,
      }
      const expectedResponse = {
        id: 1,
        name: 'Sushi',
        food: [],
      }
      const expectedResponseAfterCreateFood = {
        id: 1,
        name: 'Sushi',
        food: [{ name: createFoodInput.name }],
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
          expect(category).toEqual(expectedResponse)
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
      // get category
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: GET_CATEGORY,
          variables: { categoryId: expectedResponse.id },
        })
        .expect(200)
        .expect(({ body }) => {
          const category = body?.data?.getCategory
          expect(category).toBeDefined()
          expect(category).toEqual(expectedResponseAfterCreateFood)
        })
    })
    it('should fail to get a category because of invalid id', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: GET_CATEGORY,
          variables: { categoryId: 1 },
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
    it('should remove a category by id', async () => {
      const createCategoryInput = {
        name: 'Sushi',
      }
      const expectedResponse = {
        id: 1,
        name: 'Sushi',
        food: [],
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
          expect(category).toEqual(expectedResponse)
        })
      // delete category
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: DELETE_CATEGORY,
          variables: { categoryId: expectedResponse.id },
        })
        .expect(200)
        .expect(({ body }) => {
          const category = body?.data?.deleteCategory
          expect(category).toBeDefined()
        })
      // categories should be empty
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: GET_CATEGORIES,
        })
        .expect(200)
        .expect(({ body }) => {
          const categories = body?.data?.getCategories
          expect(categories).toBeDefined()
          expect(categories).toEqual([])
        })
    })
    it('should fail to remove a category because of invalid id', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: DELETE_CATEGORY,
          variables: { categoryId: 1 },
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
