import { Injectable } from '@nestjs/common'
import { UserInputError } from 'apollo-server-express'
import { PrismaService } from './../prisma.service'
import { CreateCategoryDto } from './dto'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  includeRelations = {
    food: true,
  }

  create = async (createCategoryInput: CreateCategoryDto) => {
    if (await this.findOneByName(createCategoryInput.name))
      throw new UserInputError('Category with this name already exists')

    return await this.prisma.category.create({
      data: createCategoryInput,
      include: this.includeRelations,
    })
  }

  findAll = async () => {
    return await this.prisma.category.findMany({
      include: this.includeRelations,
    })
  }

  findOne = async (categoryId: number) => {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
      include: this.includeRelations,
    })
    if (!category)
      throw new UserInputError(`Category with id ${categoryId} does not exist`)
    return category
  }

  remove = async (categoryId: number) => {
    await this.findOne(categoryId)

    const foodInCategory = await this.prisma.food.findMany({
      where: {
        categoryId,
      },
    })

    // remove all food in category from every users cartCount
    foodInCategory.forEach(async (food) => {
      await this.prisma.$queryRaw`
        UPDATE "User"
        SET "cartCount" = "cartCount"::jsonb - ${food.id};})`
    })

    // delete all food in category (removes from all user's cart)
    await this.prisma.category.update({
      where: { id: categoryId },
      data: {
        food: {
          deleteMany: {},
        },
      },
    })

    // delete category
    return this.prisma.category.delete({
      where: { id: categoryId },
    })
  }

  // helpers

  findOneByName = async (categoryName: string) => {
    const category = await this.prisma.category.findUnique({
      where: { name: categoryName },
      include: this.includeRelations,
    })
    return category
  }
}
