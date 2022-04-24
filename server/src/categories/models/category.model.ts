import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Food } from '../../food/models/food.model'

@ObjectType()
export class Category {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field(() => [Food], { nullable: true })
  food?: Food[]
}
