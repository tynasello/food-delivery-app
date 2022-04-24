import { Injectable } from '@nestjs/common'
import { UserInputError } from 'apollo-server-express'
import { FoodService } from './../food/food.service'
import { PrismaService } from './../prisma.service'
import { CreateUserDto, UpdateUserCartDto, UpdateUserDto } from './dto'

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly foodService: FoodService
  ) {}

  includeRelations = {
    cart: { include: { category: true } },
  }

  create = async (createUserInput: CreateUserDto) => {
    if (
      await this.prisma.user.findUnique({
        where: { username: createUserInput.username },
        include: this.includeRelations,
      })
    )
      throw new UserInputError(
        `User with username ${createUserInput.username} already exists`
      )

    return this.prisma.user.create({
      data: createUserInput,
      include: this.includeRelations,
    })
  }

  findOne = async (username: string) => {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: this.includeRelations,
    })
    if (!user)
      throw new UserInputError(`User with username ${username} does not exist`)
    return user
  }

  update = (username: string, updateUserInput: UpdateUserDto) => {
    return this.prisma.user.update({
      where: {
        username,
      },
      data: updateUserInput,
      include: this.includeRelations,
    })
  }

  updateCartAdd = async (
    username: string,
    updateCartInput: UpdateUserCartDto
  ) => {
    const { foodId } = updateCartInput
    await this.foodService.findOne(foodId)
    const user = await this.findOne(username)

    const parsedCartCount = JSON.parse(user.cartCount || '{}')

    // incriment food item in user cart count
    if (parsedCartCount[foodId]) {
      parsedCartCount[foodId] += 1
    } else {
      parsedCartCount[foodId] = 1
    }

    // update user with new cart count (connects food to user if not already connected)
    return this.prisma.user.update({
      where: {
        username,
      },
      data: {
        cartCount: JSON.stringify(parsedCartCount),
        cart: {
          connect: {
            id: foodId,
          },
        },
      },
      include: this.includeRelations,
    })
  }

  updateCartRemove = async (
    username: string,
    updateCartInput: UpdateUserCartDto
  ) => {
    const { foodId } = updateCartInput
    await this.foodService.findOne(foodId)
    const user = await this.findOne(username)

    const parsedCartCount = JSON.parse(user.cartCount || '{}')

    if (!parsedCartCount[foodId] || parsedCartCount[foodId] < 1)
      throw new UserInputError(
        `Food item with id ${foodId} not found in ${username}'s cart`
      )

    // decrement food item in user cart count
    if (parsedCartCount[foodId] > 1) {
      parsedCartCount[foodId] -= 1
      return this.prisma.user.update({
        where: {
          username,
        },
        data: {
          cartCount: JSON.stringify(parsedCartCount),
        },
        include: this.includeRelations,
      })

      // disconnects food item from user cart and removes food item from users cart count
    } else {
      delete parsedCartCount[foodId]
      return this.prisma.user.update({
        where: {
          username,
        },
        data: {
          cartCount: JSON.stringify(parsedCartCount),
          cart: {
            disconnect: {
              id: foodId,
            },
          },
        },
        include: this.includeRelations,
      })
    }
  }

  remove = async (username: string) => {
    await this.findOne(username)

    return this.prisma.user.delete({
      where: { username },
    })
  }
}
