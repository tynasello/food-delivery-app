import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../common/guards'
import { UpdateUserCartDto, UpdateUserDto } from './dto'
import { User } from './models'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'getUser' })
  @UseGuards(JwtAuthGuard)
  findOne(@Context() context: any) {
    return this.usersService.findOne(context?.req?.user?.username)
  }

  @Mutation(() => User, { name: 'updateUser' })
  @UseGuards(JwtAuthGuard)
  update(
    @Context() context: any,
    @Args('updateUserInput') updateUserInput: UpdateUserDto
  ) {
    return this.usersService.update(
      context?.req?.user?.username,
      updateUserInput
    )
  }

  @Mutation(() => User, { name: 'updateUserAddFoodToCart' })
  @UseGuards(JwtAuthGuard)
  updateUserAddFoodToCart(
    @Context() context: any,
    @Args('updateCartInput') updateCartInput: UpdateUserCartDto
  ) {
    return this.usersService.updateCartAdd(
      context?.req?.user?.username,
      updateCartInput
    )
  }

  @Mutation(() => User, { name: 'updateUserRemoveFoodFromCart' })
  @UseGuards(JwtAuthGuard)
  updateUserRemoveFoodFromCart(
    @Context() context: any,
    @Args('updateCartInput') updateCartInput: UpdateUserCartDto
  ) {
    return this.usersService.updateCartRemove(
      context?.req?.user?.username,
      updateCartInput
    )
  }

  @Mutation(() => User, { name: 'deleteUser' })
  @UseGuards(JwtAuthGuard)
  remove(@Context() context: any) {
    return this.usersService.remove(context?.req?.user?.username)
  }
}
