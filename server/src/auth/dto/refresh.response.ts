import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RefreshResponse {
  @Field()
  at: string
}
