import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto'
import { Category } from './models'

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category, { name: 'createCategory' })
  create(@Args('createCategoryInput') createCategoryInput: CreateCategoryDto) {
    return this.categoryService.create(createCategoryInput)
  }

  @Query(() => [Category], { name: 'getCategories' })
  findAll() {
    return this.categoryService.findAll()
  }

  @Query(() => Category, { name: 'getCategory' })
  findOne(@Args('categoryId', { type: () => Int }) categoryId: number) {
    return this.categoryService.findOne(categoryId)
  }

  @Mutation(() => Category, { name: 'deleteCategory' })
  remove(@Args('categoryId', { type: () => Int }) categoryId: number) {
    return this.categoryService.remove(categoryId)
  }
}
