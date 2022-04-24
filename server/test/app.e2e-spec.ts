import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { PrismaService } from '../src/prisma.service'

describe('AppController (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService],
    }).compile()

    app = moduleFixture.createNestApplication()
    prisma = app.get(PrismaService)

    await app.init()
  })

  afterAll(async () => {
    await prisma.$disconnect()
    await app.close()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })
})
