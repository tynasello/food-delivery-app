import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../../src/app.module'
import { PrismaService } from '../../src/prisma.service'
import {
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  REFRESH_TOKENS_MUTATION,
  SIGNUP_MUTATION,
} from './auth.helper'

//

describe('Auth (e2e)', () => {
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
    if (process.env.DB_MODE === 'TEST') {
      await prisma.$queryRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
    }
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

  describe('signup', () => {
    it('should sign a user up', async () => {
      const createUserInput = {
        username: 'Mock Username',
        password: 'Mock Password',
        address: 'Mock Address',
      }
      const createUserExpectedResponse = {
        id: 1,
        username: createUserInput.username,
        address: createUserInput.address,
        cart: [],
        cartCount: '{}',
        at: expect.any(String),
        rt: expect.any(String),
      }
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: SIGNUP_MUTATION,
          variables: { createUserInput },
        })
        .expect(200)
        .expect(({ body }) => {
          const signupResponse = body?.data?.signup
          expect(signupResponse).toBeDefined()
          expect(signupResponse).toEqual(createUserExpectedResponse)
        })
    })
    it('should throw error because of invalid input', async () => {
      const createUserInput = {
        username: 'Mock Username',
        password: 'Mock Password',
        address: 'Mock Address',
      }
      // should throw error because of taken username
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: SIGNUP_MUTATION,
          variables: { createUserInput },
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

  describe('login', () => {
    it('should log a user in', async () => {
      const loginInput = {
        username: 'Mock Username',
        password: 'Mock Password',
      }
      const logInExpectedResponse = {
        id: 1,
        username: 'Mock Username',
        address: 'Mock Address',
        cart: [],
        cartCount: '{}',
        at: expect.any(String),
        rt: expect.any(String),
      }
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: LOGIN_MUTATION,
          variables: { loginInput },
        })
        .expect(200)
        .expect(({ body }) => {
          const loginResponse = body?.data?.login
          expect(loginResponse).toBeDefined()
          expect(loginResponse).toEqual(logInExpectedResponse)
        })
    })
    it('should fail to log a user in because user does not exist', async () => {
      const loginInput = {
        username: 'Mock Invalid Username',
        password: 'Mock Password',
      }
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: LOGIN_MUTATION,
          variables: { loginInput },
        })
        .expect(200)
        .expect(({ body }) => {
          const errorMsg = body?.errors[0]?.message
          const errorCode = body?.errors[0]?.extensions.code
          expect(errorMsg).toEqual(expect.any(String))
          expect(errorCode).toEqual('BAD_USER_INPUT')
        })
    })
    it('should fail to log a user in because of invalid password', async () => {
      const loginInput = {
        username: 'Mock Username',
        password: 'Mock Invalid Password',
      }
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: LOGIN_MUTATION,
          variables: { loginInput },
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

  describe('refresh tokens', () => {
    it("should refresh a user's tokens", async () => {
      let oldAt = ''
      let rt = ''
      const loginInput = {
        username: 'Mock Username',
        password: 'Mock Password',
      }
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: LOGIN_MUTATION,
          variables: { loginInput },
        })
        .expect(200)
        .expect(({ body }) => {
          oldAt = body?.data?.login.at
          rt = body?.data?.login.rt
        })
      await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', `Bearer ${rt}`)
        .send({
          query: REFRESH_TOKENS_MUTATION,
        })
        .expect(200)
        .expect(({ body }) => {
          const refreshTokensResponse = body?.data?.refreshTokens
          expect(refreshTokensResponse).toBeDefined()
          expect(refreshTokensResponse).toEqual({ at: expect.any(String) })
          expect(refreshTokensResponse).toEqual({
            at: expect.not.stringMatching(oldAt),
          })
        })
    })
    it('should fail to refresh a users token because of invalid rt', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', `Bearer ${'Mock invalid rt'}`)
        .send({
          query: REFRESH_TOKENS_MUTATION,
        })
        .expect(200)
        .expect(({ body }) => {
          const errorMsg = body?.errors[0]?.message
          const errorCode = body?.errors[0]?.extensions.code
          expect(errorMsg).toEqual('Unauthorized')
          expect(errorCode).toEqual('UNAUTHENTICATED')
        })
    })
  })

  //

  describe('logout ', () => {
    it('should log a user out', async () => {
      let at = ''

      const loginInput = {
        username: 'Mock Username',
        password: 'Mock Password',
      }
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: LOGIN_MUTATION,
          variables: { loginInput },
        })
        .expect(200)
        .expect(({ body }) => {
          at = body?.data?.login.at
        })
      await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', `Bearer ${at}`)
        .send({
          query: LOGOUT_MUTATION,
        })
        .expect(200)
        .expect(({ body }) => {
          const logoutResponse = body?.data?.logout
          expect(logoutResponse).toBeDefined()
          expect(logoutResponse).toEqual({ username: loginInput.username })
        })
    })
  })
})
