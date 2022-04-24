import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateUserDto {
  @Field()
  @IsNotEmpty({ message: 'Must specify user username' })
  @IsString({ message: 'Username must be of type String' })
  username: string

  @Field()
  @IsNotEmpty({ message: 'Must specify user password' })
  @IsString({ message: 'Password must be of type String' })
  password: string

  @Field()
  @IsNotEmpty({ message: 'Must specify user address' })
  @IsString({ message: 'Address must be of type String' })
  address: string
}
