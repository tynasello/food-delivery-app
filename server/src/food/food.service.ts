import { Injectable } from '@nestjs/common'
import { UserInputError } from 'apollo-server-express'
import { CategoryService } from '../categories/category.service'
import { PrismaService } from './../prisma.service'
import { CreateFoodDto } from './dto'

@Injectable()
export class FoodService {
  constructor(
    private prisma: PrismaService,
    private readonly categoryService: CategoryService
  ) {}

  includeRelations = {
    category: true,
  }

  create = async (createFoodInput: CreateFoodDto) => {
    await this.categoryService.findOne(createFoodInput.categoryId)

    return this.prisma.food.create({
      data: createFoodInput,
      include: this.includeRelations,
    })
  }

  findAll = async () => {
    return await this.prisma.food.findMany({
      include: this.includeRelations,
    })
  }

  findOne = async (foodId: number) => {
    const food = await this.prisma.food.findUnique({
      where: { id: foodId },
      include: this.includeRelations,
    })
    if (!food) throw new UserInputError(`Food with id ${foodId} does not exist`)
    return food
  }

  remove = async (foodId: number) => {
    await this.findOne(foodId)

    // remove food from all users cart count
    await this.prisma.$queryRaw`
      UPDATE "User"
      SET "cartCount" = "cartCount"::jsonb - ${foodId};
    `

    // remove food (removes food from all users)
    return this.prisma.food.delete({
      where: { id: foodId },
    })
  }
}
