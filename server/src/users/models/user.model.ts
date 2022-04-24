import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Food } from '../../food/models/food.model'

@ObjectType()
export class User {
  @Field(() => Int)
  id: number

  @Field()
  username: string

  @Field()
  address: string

  @Field()
  cartCount: string

  @Field(() => [Food], { nullable: true, defaultValue: [] })
  cart?: Food[]
}
