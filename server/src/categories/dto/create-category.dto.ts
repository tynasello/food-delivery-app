import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class CreateCategoryDto {
  @Field()
  @IsNotEmpty({ message: 'Must specify category name' })
  name: string
}
