import { Test, TestingModule } from '@nestjs/testing'
import { JwtAuthGuard } from './../../common/guards'
import { JwtRefreshAuthGuard } from './../../common/guards/jwt-refresh-auth.guard'
import { AuthResolver } from './../auth.resolver'
import { AuthService } from './../auth.service'

describe('AuthResolevr', () => {
  let authResolver: AuthResolver

  const authServiceMock = {
    signup: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
    refreshTokens: jest.fn(),
  }

  const mockJwtAuthGuard = jest.fn()
  const mockJwtRefreshAuthGuard = jest.fn()

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        { provide: AuthService, useValue: authServiceMock },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .overrideGuard(JwtRefreshAuthGuard)
      .useValue(mockJwtRefreshAuthGuard)
      .compile()

    authResolver = moduleRef.get<AuthResolver>(AuthResolver)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should be defined', () => {
    expect(authResolver).toBeDefined()
  })

  //

  describe('signup', () => {
    it('should sign a user up', () => {
      const mockSignupInput = {
        username: 'mock username',
        password: 'mock password',
        address: 'mock address',
      }
      authResolver.signup(mockSignupInput)
      expect(authServiceMock.signup).toHaveBeenCalledTimes(1)
      expect(authServiceMock.signup).toHaveBeenCalledWith(mockSignupInput)
    })
  })

  //

  describe('login', () => {
    it('should log a user in', () => {
      const mockLoginInput = {
        username: 'mock username',
        password: 'mock password',
      }
      authResolver.login(mockLoginInput)
      expect(authServiceMock.login).toHaveBeenCalledTimes(1)
      expect(authServiceMock.login).toHaveBeenCalledWith(mockLoginInput)
    })
  })

  //

  describe('logout', () => {
    it('should log a user out', () => {
      // @ts-ignore
      authResolver.logout()
      expect(authServiceMock.logout).toHaveBeenCalledTimes(1)
    })
  })

  //

  describe('refreshTokents', () => {
    it('should refresh users access token', () => {
      const mockRefreshResult = { at: 'mock refreshed at' }
      authServiceMock.refreshTokens.mockReturnValueOnce(mockRefreshResult)
      // @ts-ignore
      authResolver.refreshTokens()
      expect(authServiceMock.refreshTokens).toHaveBeenCalledTimes(1)
      expect(mockRefreshResult).toBe(mockRefreshResult)
    })
  })
})
