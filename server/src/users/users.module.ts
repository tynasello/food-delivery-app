import { CategoryService } from '../categories/category.service'
import { FoodService } from './../food/food.service'
import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { PrismaService } from './../prisma.service'

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
