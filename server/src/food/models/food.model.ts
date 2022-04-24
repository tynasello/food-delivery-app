import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { Category } from '../../categories/models/category.model'

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
