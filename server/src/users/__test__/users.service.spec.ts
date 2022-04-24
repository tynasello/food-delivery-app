import { Test, TestingModule } from '@nestjs/testing'
import { UserInputError } from 'apollo-server-express'
import { PrismaService } from '../../prisma.service'
import { FoodService } from './../../food/food.service'
import { UsersService } from './../users.service'

describe('UsersService', () => {
  let spy: jest.SpyInstance

  let usersService: UsersService

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    food: {
      findOne: jest.fn(),
    },
    $queryRaw: jest.fn(),
  }
  const mockFoodService = {
    findOne: jest.fn(),
  }

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: FoodService, useValue: mockFoodService },
      ],
    }).compile()

    usersService = moduleRef.get<UsersService>(UsersService)
  })

  afterEach(() => {
    jest.resetAllMocks()
    spy?.mockClear()
  })

  it('should be defined', () => {
    expect(usersService).toBeDefined()
  })

  //

  describe('create', () => {
    it('should create a user', async () => {
      const mockCreateUserInput = {
        username: 'mock username',
        password: 'mock password',
        address: 'mock address',
      }

      spy = jest.spyOn(usersService, 'findOne').mockImplementation(
        () =>
          new Promise((resolve) => {
            // @ts-ignore
            resolve(false)
          })
      )

      await usersService.create(mockCreateUserInput)
      expect(mockPrismaService.user.create).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: mockCreateUserInput,
        include: usersService.includeRelations,
      })
    })
  })

  //

  describe('findOne', () => {
    it('should return one user', async () => {
      const mockFindUserInput = {
        username: 'mock username',
      }
      const mockPrismaFindUniqueResponse = {
        id: 1,
        username: 'mock username',
        address: 'mock address',
        cart: [],
        rt: 'mock rt',
        cartCount: 'mock cartCount',
      }
      mockPrismaService.user.findUnique.mockReturnValueOnce(
        mockPrismaFindUniqueResponse
      )
      const findUserResult = await usersService.findOne(
        mockFindUserInput.username
      )
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { username: mockFindUserInput.username },
        include: usersService.includeRelations,
      })
      expect(findUserResult).toEqual(mockPrismaFindUniqueResponse)
    })

    it('should throw error because of no user', async () => {
      const mockFindUserInput = {
        username: 'mock username',
      }

      mockPrismaService.user.findUnique.mockReturnValueOnce(false)

      try {
        await usersService.findOne(mockFindUserInput.username)
      } catch (error) {
        expect(error).toBeInstanceOf(UserInputError)
        expect(error.message).toBe(
          `User with username ${mockFindUserInput.username} does not exist`
        )
      }
    })
  })

  //

  describe('update', () => {
    it('should update user', async () => {
      const mockUpdateUserInput = {
        username: 'mock username',
        updateUserInput: {
          address: 'mock address',
        },
      }
      const mockPrismaUpdateUserResponse = {
        username: mockUpdateUserInput.username,
        address: mockUpdateUserInput.updateUserInput.address,
        cart: [],
        rt: 'mock rt',
        cartCount: '[{ 1: 2 }]',
      }
      mockPrismaService.user.update.mockReturnValueOnce(
        mockPrismaUpdateUserResponse
      )
      const mockUpdateUserRespone = await usersService.update(
        mockUpdateUserInput.username,
        mockUpdateUserInput.updateUserInput
      )
      expect(mockPrismaService.user.update).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: {
          username: mockUpdateUserInput.username,
        },
        data: mockUpdateUserInput.updateUserInput,
        include: usersService.includeRelations,
      })
      expect(mockUpdateUserRespone).toEqual(mockPrismaUpdateUserResponse)
    })
  })

  //

  describe('updateCartAdd', () => {
    it('should add a food item to a cart', async () => {
      const mockUsername = 'mock username'
      const cartAddInput = {
        foodId: 1,
      }
      const mockFindOneUserResponse = {
        username: mockUsername,
        address: 'mock address',
        cart: [],
        rt: 'mock rt',
        cartCount: JSON.stringify({ 1: 2 }),
      }

      spy = jest.spyOn(usersService, 'findOne').mockImplementation(
        () =>
          new Promise((resolve) => {
            // @ts-ignore
            resolve(mockFindOneUserResponse)
          })
      )

      await usersService.updateCartAdd(mockUsername, cartAddInput)

      expect(mockPrismaService.user.update).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: {
          username: mockUsername,
        },
        data: {
          cartCount: expect.any(String),
          cart: {
            connect: {
              id: cartAddInput.foodId,
            },
          },
        },
        include: usersService.includeRelations,
      })
    })
  })

  //

  describe('updateCartRemove', () => {
    it("should remove one food item from user's cart", async () => {
      const mockUsername = 'mock username'
      const cartAddInput = {
        foodId: 1,
      }
      const mockFindOneUserResponse = {
        username: mockUsername,
        address: 'mock address',
        cart: [],
        rt: 'mock rt',
        cartCount: JSON.stringify({ 1: 2 }),
      }

      spy = jest.spyOn(usersService, 'findOne').mockImplementation(
        () =>
          new Promise((resolve) => {
            // @ts-ignore
            resolve(mockFindOneUserResponse)
          })
      )

      await usersService.updateCartRemove(mockUsername, cartAddInput)

      expect(mockPrismaService.user.update).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: {
          username: mockUsername,
        },
        data: {
          cartCount: expect.any(String),
        },
        include: usersService.includeRelations,
      })
    })

    it("should remove one food item from user's cart and disconnect food from cart", async () => {
      const mockUsername = 'mock username'
      const cartAddInput = {
        foodId: 1,
      }
      const mockFindOneUserResponse = {
        username: mockUsername,
        address: 'mock address',
        cart: [],
        rt: 'mock rt',
        cartCount: JSON.stringify({ 1: 1 }),
      }

      spy = jest.spyOn(usersService, 'findOne').mockImplementation(
        () =>
          new Promise((resolve) => {
            // @ts-ignore
            resolve(mockFindOneUserResponse)
          })
      )

      await usersService.updateCartRemove(mockUsername, cartAddInput)

      expect(mockPrismaService.user.update).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: {
          username: mockUsername,
        },
        data: {
          cartCount: expect.any(String),
          cart: {
            disconnect: {
              id: cartAddInput.foodId,
            },
          },
        },
        include: usersService.includeRelations,
      })
    })

    it('should throw error because food item not in cart', async () => {
      const mockUsername = 'mock username'
      const cartAddInput = {
        foodId: 1,
      }
      const mockFindOneUserResponse = {
        username: mockUsername,
        address: 'mock address',
        cart: [],
        rt: 'mock rt',
        cartCount: JSON.stringify({}),
      }

      spy = jest.spyOn(usersService, 'findOne').mockImplementation(
        () =>
          new Promise((resolve) => {
            // @ts-ignore
            resolve(mockFindOneUserResponse)
          })
      )
      try {
        await usersService.updateCartRemove(mockUsername, cartAddInput)
        expect(true).toEqual(false)
      } catch (error) {
        expect(error).toBeInstanceOf(UserInputError)
        expect(error.message).toBe(
          `Food item with id ${cartAddInput.foodId} not found in ${mockUsername}'s cart`
        )
      }
    })
  })

  //

  describe('remove', () => {
    it('should remove a user', async () => {
      spy = jest.spyOn(usersService, 'findOne').mockImplementation(
        () =>
          new Promise((resolve) => {
            // @ts-ignore
            resolve(false)
          })
      )
      const mockUsername = 'mock username'

      await usersService.remove(mockUsername)

      expect(mockPrismaService.user.delete).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.user.delete).toHaveBeenCalledWith({
        where: {
          username: mockUsername,
        },
      })
    })
  })
})
