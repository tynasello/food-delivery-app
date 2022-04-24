import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../../prisma.service'
import { CategoryService } from '../category.service'

describe('CategoryService', () => {
  let categoryService: CategoryService

  const mockPrismaService = {
    category: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(() => true),
      delete: jest.fn(),
      update: jest.fn(),
    },
    food: {
      findMany: jest.fn(),
    },
    $queryRaw: jest.fn(),
  }

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile()

    categoryService = moduleRef.get<CategoryService>(CategoryService)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should be defined', () => {
    expect(categoryService).toBeDefined()
  })

  //

  describe('create', () => {
    it('should create a food item', async () => {
      const mockCreateInput = {
        name: 'mock name',
      }
      await categoryService.create(mockCreateInput)
      expect(mockPrismaService.category.create).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.category.create).toHaveBeenCalledWith({
        data: mockCreateInput,
        include: categoryService.includeRelations,
      })
    })
  })

  //

  describe('findAll', () => {
    it('should return all food items', async () => {
      await categoryService.findAll()
      expect(mockPrismaService.category.findMany).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.category.findMany).toHaveBeenCalledWith({
        include: categoryService.includeRelations,
      })
    })
  })

  //

  describe('findOne', () => {
    it('should return one food item', async () => {
      const mockCategoryId = 1
      mockPrismaService.category.findUnique.mockReturnValueOnce(true)
      await categoryService.findOne(mockCategoryId)
      expect(mockPrismaService.category.findUnique).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.category.findUnique).toHaveBeenCalledWith({
        where: { id: mockCategoryId },
        include: categoryService.includeRelations,
      })
    })
  })

  //

  describe('remove', () => {
    it('should remove one food item', async () => {
      const mockCategoryId = 1
      mockPrismaService.category.findUnique.mockReturnValueOnce(true)
      mockPrismaService.food.findMany.mockReturnValueOnce([])
      await categoryService.remove(mockCategoryId)
      expect(mockPrismaService.category.update).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.category.update).toHaveBeenCalledWith({
        where: { id: mockCategoryId },
        data: {
          food: {
            deleteMany: {},
          },
        },
      })
      expect(mockPrismaService.category.delete).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.category.delete).toHaveBeenCalledWith({
        where: { id: mockCategoryId },
      })
    })
  })
})
