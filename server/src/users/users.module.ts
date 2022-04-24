import { Module } from '@nestjs/common'
import { CategoryService } from '../categories/category.service'
import { FoodService } from './../food/food.service'
import { PrismaService } from './../prisma.service'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  providers: [
    UsersResolver,
    UsersService,
    CategoryService,
    FoodService,
    PrismaService,
  ],
  exports: [UsersService, FoodService, PrismaService],
})
export class UsersModule {}
