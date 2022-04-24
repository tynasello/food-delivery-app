import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { JwtAuthGuard, JwtRefreshAuthGuard } from '../common/guards'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { AuthService } from './auth.service'
import {
  LoginDto,
  LoginSignupResponse,
  LogoutResponse,
  RefreshResponse,
} from './dto'

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginSignupResponse, { name: 'signup' })
  signup(@Args('createUserInput') createUserInput: CreateUserDto) {
    return this.authService.signup(createUserInput)
  }

  @Mutation(() => LoginSignupResponse, { name: 'login' })
  login(@Args('loginInput') loginUserInput: LoginDto) {
    return this.authService.login(loginUserInput)
  }

  @Mutation(() => LogoutResponse, { name: 'logout' })
  @UseGuards(JwtAuthGuard)
  logout(@Context() context) {
    console.log(context)
    return this.authService.logout(context?.req?.user?.username)
  }

  @Mutation(() => RefreshResponse, { name: 'refreshTokens' })
  @UseGuards(JwtRefreshAuthGuard)
  refreshTokens(@Context() context) {
    return this.authService.refreshTokens(
      context?.req?.user?.username,
      context?.req?.user?.rt
    )
  }
}
