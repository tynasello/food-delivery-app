import { Test, TestingModule } from '@nestjs/testing'
import { CategoryService } from '../../categories/category.service'
import { PrismaService } from '../../prisma.service'
import { FoodService } from '../food.service'

describe('FoodService', () => {
  let foodService: FoodService

  const mockPrismaService = {
    food: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(() => true),
      delete: jest.fn(),
    },
    $queryRaw: jest.fn(),
  }
  const mockCategoryService = {
    findOne: jest.fn(),
  }

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        FoodService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: CategoryService, useValue: mockCategoryService },
      ],
    }).compile()

    foodService = moduleRef.get<FoodService>(FoodService)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should be defined', () => {
    expect(foodService).toBeDefined()
  })

  //

  describe('create', () => {
    it('should create a food item', async () => {
      const mockCreateInput = {
        name: 'mock name',
        restaurant: 'mock restaurant',
        price: 1.1,
        categoryId: 1,
      }
      await foodService.create(mockCreateInput)
      expect(mockPrismaService.food.create).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.food.create).toHaveBeenCalledWith({
        data: mockCreateInput,
        include: foodService.includeRelations,
      })
    })
  })

  //

  describe('findAll', () => {
    it('should return all food items', async () => {
      await foodService.findAll()
      expect(mockPrismaService.food.findMany).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.food.findMany).toHaveBeenCalledWith({
        include: foodService.includeRelations,
      })
    })
  })

  //

  describe('findOne', () => {
    it('should return one food item', async () => {
      const mockFoodId = 1
      mockPrismaService.food.findUnique.mockReturnValueOnce(true)
      await foodService.findOne(mockFoodId)
      expect(mockPrismaService.food.findUnique).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.food.findUnique).toHaveBeenCalledWith({
        where: { id: mockFoodId },
        include: foodService.includeRelations,
      })
    })
  })

  //

  describe('remove', () => {
    it('should remove one food item', async () => {
      const mockFoodId = 1
      mockPrismaService.food.findUnique.mockReturnValueOnce(true)
      await foodService.remove(mockFoodId)
      expect(mockPrismaService.food.delete).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.food.delete).toHaveBeenCalledWith({
        where: { id: mockFoodId },
      })
    })
  })
})
