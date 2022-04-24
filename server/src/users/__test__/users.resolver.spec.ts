import { Test, TestingModule } from '@nestjs/testing'
import { JwtAuthGuard, JwtRefreshAuthGuard } from '../../common/guards'
import { UsersResolver } from './../users.resolver'
import { UsersService } from './../users.service'

describe('UsersResolver', () => {
  let usersResolver: UsersResolver

  const usersServiceMock = {
    findOne: jest.fn(),
    update: jest.fn(),
    updateCartAdd: jest.fn(),
    updateCartRemove: jest.fn(),
    remove: jest.fn(),
  }

  const mockJwtAuthGuard = jest.fn()
  const mockJwtRefreshAuthGuard = jest.fn()

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        { provide: UsersService, useValue: usersServiceMock },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .overrideGuard(JwtRefreshAuthGuard)
      .useValue(mockJwtRefreshAuthGuard)
      .compile()

    usersResolver = moduleRef.get<UsersResolver>(UsersResolver)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should be defined', () => {
    expect(usersResolver).toBeDefined()
  })

  //

  describe('findOne', () => {
    it('should find a user', () => {
      // @ts-ignore
      usersResolver.findOne()
      expect(usersServiceMock.findOne).toHaveBeenCalledTimes(1)
    })
  })

  //

  describe('update', () => {
    it('should update a user', () => {
      const updateUserInput = {
        address: 'mock adress',
      }
      usersServiceMock.update.mockReturnValueOnce(updateUserInput)
      // @ts-ignore
      const updateUserResult = usersResolver.update(updateUserInput)
      expect(usersServiceMock.update).toHaveBeenCalledTimes(1)
      expect(updateUserResult).toEqual(updateUserInput)
    })
  })

  //

  describe('updateUserAddFoodToCart', () => {
    it("should add a food item to a user's cart", () => {
      const cartAddInput = {
        foodId: 1,
      }
      usersServiceMock.updateCartAdd.mockReturnValueOnce(cartAddInput)
      // @ts-ignore
      const cartAddResult = usersResolver.updateUserAddFoodToCart(cartAddInput)
      expect(usersServiceMock.updateCartAdd).toHaveBeenCalledTimes(1)
      expect(cartAddResult).toEqual(cartAddInput)
    })
  })

  //

  describe('updateUserRemoveFoodToCart', () => {
    it("should remove a food item from a user's cart", () => {
      const cartRemoveInput = {
        foodId: 1,
      }
      usersServiceMock.updateCartRemove.mockReturnValueOnce(cartRemoveInput)
      // prettier-ignore
      // @ts-ignore
      const cartRemoveResult = usersResolver.updateUserRemoveFoodFromCart(cartRemoveInput)
      expect(usersServiceMock.updateCartRemove).toHaveBeenCalledTimes(1)
      expect(cartRemoveResult).toEqual(cartRemoveInput)
    })
  })

  //

  describe('remove', () => {
    it('should delete one user', () => {
      // @ts-ignore
      usersResolver.remove()
      expect(usersServiceMock.remove).toHaveBeenCalledTimes(1)
    })
  })
})
