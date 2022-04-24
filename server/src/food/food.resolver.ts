import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateFoodDto } from './dto'
import { FoodService } from './food.service'
import { Food } from './models'

@Resolver(() => Food)
export class FoodResolver {
  constructor(private readonly foodService: FoodService) {}

  @Mutation(() => Food, { name: 'createFood' })
  create(@Args('createFoodInput') createFoodInput: CreateFoodDto) {
    return this.foodService.create(createFoodInput)
  }

  @Query(() => [Food], { name: 'getFoods' })
  findAll() {
    return this.foodService.findAll()
  }

  @Query(() => Food, { name: 'getFood' })
  findOne(@Args('foodId', { type: () => Int }) foodId: number) {
    return this.foodService.findOne(foodId)
  }

  @Mutation(() => Food, { name: 'deleteFood' })
  remove(@Args('foodId', { type: () => Int }) foodId: number) {
    return this.foodService.remove(foodId)
  }
}
