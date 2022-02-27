import { Food } from '../../food/models/food.model'
import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(() => Int)
  id: number

  @Field()
  username: string

  @Field()
  password: string

  @Field()
  address: string

  @Field()
  cartCount: string

  @Field()
  rt: string

  @Field(() => [Food], { nullable: true, defaultValue: [] })
  cart?: Food[]
}
