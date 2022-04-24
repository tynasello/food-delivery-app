import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { JwtAuthGuard } from '../common/guards'
import { UpdateUserCartDto, UpdateUserDto } from './dto'
import { User } from './models'
import { UsersService } from './users.service'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'getUser' })
  @UseGuards(JwtAuthGuard)
  findOne(@Context() context) {
    return this.usersService.findOne(context?.req?.user?.username)
  }

  @Mutation(() => User, { name: 'updateUser' })
  @UseGuards(JwtAuthGuard)
  update(
    @Context() context,
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
    @Context() context,
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
    @Context() context,
    @Args('updateCartInput') updateCartInput: UpdateUserCartDto
  ) {
    return this.usersService.updateCartRemove(
      context?.req?.user?.username,
      updateCartInput
    )
  }

  @Mutation(() => User, { name: 'deleteUser' })
  @UseGuards(JwtAuthGuard)
  remove(@Context() context) {
    return this.usersService.remove(context?.req?.user?.username)
  }
}
