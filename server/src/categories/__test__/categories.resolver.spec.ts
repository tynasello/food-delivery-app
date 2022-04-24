import { Test, TestingModule } from '@nestjs/testing'
import { CategoryResolver } from '../category.resolver'
import { CategoryService } from '../category.service'

describe('CategoryResolver', () => {
  let categoryResolver: CategoryResolver

  const categoryServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryResolver,
        { provide: CategoryService, useValue: categoryServiceMock },
      ],
    }).compile()

    categoryResolver = moduleRef.get<CategoryResolver>(CategoryResolver)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should be defined', () => {
    expect(categoryResolver).toBeDefined()
  })

  //

  describe('create', () => {
    it('should create a category', () => {
      const mockCreateInput = {
        name: 'mock name',
      }
      categoryResolver.create(mockCreateInput)
      expect(categoryServiceMock.create).toHaveBeenCalledTimes(1)
      expect(categoryServiceMock.create).toHaveBeenCalledWith(mockCreateInput)
    })
  })

  //

  describe('findAll', () => {
    it('should find all categories', () => {
      categoryServiceMock.findAll.mockReturnValueOnce([])
      const foods = categoryResolver.findAll()
      expect(categoryServiceMock.findAll).toHaveBeenCalledTimes(1)
      expect(foods).toEqual([])
    })
  })

  //

  describe('findOne', () => {
    it('should find one category', () => {
      const mockFindOneResult = { id: 1, name: 'mock cateogry', food: [] }
      categoryServiceMock.findOne.mockReturnValueOnce(mockFindOneResult)
      const findOneResult = categoryResolver.findOne(mockFindOneResult.id)
      expect(categoryServiceMock.findOne).toHaveBeenCalledTimes(1)
      expect(categoryServiceMock.findOne).toHaveBeenCalledWith(
        mockFindOneResult.id
      )
      expect(findOneResult).toEqual(mockFindOneResult)
    })
  })

  //

  describe('remove', () => {
    it('should delete one category', () => {
      const mockRemoveResult = { id: 1, name: 'deleted mock cateogry' }
      categoryServiceMock.remove.mockReturnValueOnce(mockRemoveResult)
      const removeResult = categoryResolver.remove(mockRemoveResult.id)
      expect(categoryServiceMock.remove).toHaveBeenCalledTimes(1)
      expect(removeResult).toBe(mockRemoveResult)
    })
  })
})
