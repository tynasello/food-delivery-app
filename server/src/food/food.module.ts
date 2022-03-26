import { CategoryService } from '../categories/category.service'
import { Module } from '@nestjs/common'
import { FoodService } from './food.service'
import { FoodResolver } from './food.resolver'
import { PrismaService } from './../prisma.service'

@Module({
  providers: [FoodResolver, FoodService, CategoryService, PrismaService],
  exports: [FoodService],
})
export class FoodModule {}
