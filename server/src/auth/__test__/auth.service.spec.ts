import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../../prisma.service'
import { UsersService } from '../../users/users.service'
import { AuthService } from './../auth.service'

describe('AuthService', () => {
  let spy: jest.SpyInstance

  let authService: AuthService

  const mockUserService = {
    create: jest.fn(),
    findOne: jest.fn(),
  }
  const mockJwtService = { signAsync: jest.fn() }
  const mockPrismaService = {
    user: {
      update: jest.fn(),
      updateMany: jest.fn(),
    },
  }

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: UsersService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile()

    authService = moduleRef.get<AuthService>(AuthService)
  })

  afterEach(() => {
    jest.resetAllMocks()
    spy?.mockClear()
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  //

  describe('signup', () => {
    it('should signup a user', async () => {
      const mockSignupInput = {
        username: 'mock username',
        password: 'mock password',
        address: 'mock address',
      }
      const mockUserCreateResponse = {
        id: 1,
        username: mockSignupInput.username,
        address: mockSignupInput.address,
        cart: [],
        cartCount: 'mock cartCount',
      }
      const mockCreateTokensResponse = {
        at: 'mock at',
        rt: 'mock rt',
      }

      spy = jest.spyOn(authService, 'createTokens').mockImplementation(
        () =>
          new Promise((resolve) => {
            resolve(mockCreateTokensResponse)
          })
      )

      mockUserService.create.mockReturnValueOnce(mockUserCreateResponse)
      const signupResult = await authService.signup(mockSignupInput)
      expect(mockUserService.create).toHaveBeenCalledTimes(1)
      expect(authService.createTokens).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.user.update).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: {
          username: mockSignupInput.username,
        },
        data: {
          rt: expect.any(String),
        },
      })
      expect(signupResult).toEqual({
        ...mockUserCreateResponse,
        ...mockCreateTokensResponse,
      })
    })
  })

  //

  describe('login', () => {
    it('should log the user in', async () => {
      const mockSigninInput = {
        username: 'mock username',
        password: 'mock password',
      }
      const mockUserCreateResponse = {
        id: 1,
        username: mockSigninInput.username,
        password: await bcrypt.hash(mockSigninInput.password, 10),
        address: 'mock address',
        cart: [],
        cartCount: 'mock cartCount',
        at: 'mock at',
        rt: 'mock rt',
      }
      const mockCreateTokensResponse = {
        at: 'mock at',
        rt: 'mock rt',
      }

      spy = jest.spyOn(authService, 'createTokens').mockImplementation(
        () =>
          new Promise((resolve) => {
            resolve(mockCreateTokensResponse)
          })
      )

      mockUserService.findOne.mockReturnValueOnce(mockUserCreateResponse)
      const loginResult = await authService.login(mockSigninInput)
      expect(mockUserService.findOne).toHaveBeenCalledTimes(1)
      expect(authService.createTokens).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.user.update).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: {
          username: mockSigninInput.username,
        },
        data: {
          rt: expect.any(String),
        },
      })
      expect(loginResult).toEqual({
        ...mockUserCreateResponse,
        ...mockCreateTokensResponse,
      })
    })
  })

  //

  describe('logout', () => {
    it('should log user out', async () => {
      const mockLogoutInput = {
        username: 'mock username',
      }
      const logoutResult = await authService.logout(mockLogoutInput.username)
      expect(mockUserService.findOne).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.user.updateMany).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.user.updateMany).toHaveBeenCalledWith({
        where: {
          username: mockLogoutInput.username,
          rt: {
            not: null,
          },
        },
        data: {
          rt: null,
        },
      })
      expect(logoutResult).toEqual(mockLogoutInput)
    })
  })

  //

  describe('refreshTokens', () => {
    it("should refresh user's tokens", async () => {
      const mockRefreshInput = {
        username: 'mock username',
        rt: 'mock rt',
      }
      const mockRefreshResponse = {
        username: mockRefreshInput.username,
        rt: await bcrypt.hash(mockRefreshInput.rt, 10),
      }
      const mockRefreshAtResponse = {
        at: 'mock refreshed at',
      }
      spy = jest.spyOn(authService, 'refreshAt').mockImplementation(
        () =>
          new Promise((resolve) => {
            resolve(mockRefreshAtResponse.at)
          })
      )

      mockUserService.findOne.mockReturnValueOnce(mockRefreshResponse)
      const refreshResult = await authService.refreshTokens(
        mockRefreshInput.username,
        mockRefreshInput.rt
      )
      expect(mockUserService.findOne).toHaveBeenCalledTimes(1)
      expect(authService.refreshAt).toHaveBeenCalledTimes(1)
      expect(refreshResult).toEqual(mockRefreshAtResponse)
    })
  })
})
