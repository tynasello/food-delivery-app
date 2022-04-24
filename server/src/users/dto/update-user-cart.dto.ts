import { Field, InputType, Int } from '@nestjs/graphql'
import { IsNumber, IsOptional } from 'class-validator'

@InputType()
export class UpdateUserCartDto {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber({}, { message: 'Food id must be of type Int' })
  foodId?: number
}
