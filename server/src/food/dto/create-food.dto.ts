import { Field, Float, InputType, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

@InputType()
export class CreateFoodDto {
  @Field()
  @IsNotEmpty({ message: 'Must specify food name' })
  @IsString({ message: 'Name must be of type String' })
  name: string

  @Field()
  @IsNotEmpty({ message: 'Must specify restaurant name' })
  @IsString({ message: 'Restaurant name must be of type String' })
  restaurant: string

  @Field(() => Float)
  @IsNotEmpty({ message: 'Must specify price of food' })
  @IsNumber({}, { message: 'Price of food must be of type Float' })
  price: number

  @Field(() => Int)
  @IsNotEmpty({ message: 'Must specify category id of food' })
  @IsNumber({}, { message: 'Category id must be of type Int' })
  categoryId: number
}
