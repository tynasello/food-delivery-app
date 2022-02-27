import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class RefreshTokenDto {
  @Field()
  username: string

  @Field()
  rt: string
}
