import { Module } from '@nestjs/common'
import { CategoryService } from '../categories/category.service'
import { PrismaService } from './../prisma.service'
import { FoodResolver } from './food.resolver'
import { FoodService } from './food.service'

@Module({
  providers: [FoodResolver, FoodService, CategoryService, PrismaService],
  exports: [FoodService],
})
export class FoodModule {}
