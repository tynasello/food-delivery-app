import { Food } from '../../food/models/food.model'
import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class Category {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field(() => [Food], { nullable: true })
  food?: Food[]
}
