import { Category } from '../../categories/models/category.model'
import { ObjectType, Field, Int, Float } from '@nestjs/graphql'

@ObjectType()
export class Food {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field()
  restaurant: string

  @Field(() => Float)
  price: number

  @Field(() => Category)
  category?: Category

  @Field(() => Int)
  categoryId: number
}
