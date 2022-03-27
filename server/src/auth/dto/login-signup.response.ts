import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Food } from '../../food/models'
@ObjectType()
export class LoginSignupResponse {
  @Field(() => Int)
  id: number

  @Field()
  username: string

  @Field()
  address: string

  @Field(() => [Food], { nullable: true, defaultValue: [] })
  cart?: Food[]

  @Field()
  cartCount: string

  @Field()
  at: string

  @Field()
  rt: string
}
