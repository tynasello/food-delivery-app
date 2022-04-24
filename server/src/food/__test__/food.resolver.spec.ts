import { Test, TestingModule } from '@nestjs/testing'
import { FoodService } from '../food.service'
import { FoodResolver } from './../food.resolver'

describe('FoodResolver', () => {
  let foodResolver: FoodResolver

  const foodServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        FoodResolver,
        { provide: FoodService, useValue: foodServiceMock },
      ],
    }).compile()

    foodResolver = moduleRef.get<FoodResolver>(FoodResolver)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should be defined', () => {
    expect(FoodResolver).toBeDefined()
  })

  //

  describe('create', () => {
    it('should create a food item', () => {
      const mockCreateInput = {
        name: 'mock name',
        restaurant: 'mock restaurant',
        price: 1.1,
        categoryId: 1,
      }
      foodResolver.create(mockCreateInput)
      expect(foodServiceMock.create).toHaveBeenCalledTimes(1)
      expect(foodServiceMock.create).toHaveBeenCalledWith(mockCreateInput)
    })
  })

  //

  describe('findAll', () => {
    it('should find all food items', () => {
      foodServiceMock.findAll.mockReturnValueOnce([])
      const foods = foodResolver.findAll()
      expect(foodServiceMock.findAll).toHaveBeenCalledTimes(1)
      expect(foods).toEqual([])
    })
  })

  //

  describe('findOne', () => {
    it('should find one food item', () => {
      const mockFindOneResult = { id: 1, name: 'mock cateogry', food: [] }
      foodServiceMock.findOne.mockReturnValueOnce(mockFindOneResult)
      const findOneResult = foodResolver.findOne(mockFindOneResult.id)
      expect(foodServiceMock.findOne).toHaveBeenCalledTimes(1)
      expect(foodServiceMock.findOne).toHaveBeenCalledWith(mockFindOneResult.id)
      expect(findOneResult).toEqual(mockFindOneResult)
    })
  })

  //

  describe('remove', () => {
    it('should delete one food item', () => {
      const mockRemoveResult = { id: 1, name: 'deleted mock food' }
      foodServiceMock.remove.mockReturnValueOnce(mockRemoveResult)
      const removeResult = foodResolver.remove(mockRemoveResult.id)
      expect(foodServiceMock.remove).toHaveBeenCalledTimes(1)
      expect(removeResult).toBe(mockRemoveResult)
    })
  })
})
