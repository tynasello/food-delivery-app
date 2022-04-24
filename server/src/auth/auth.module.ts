import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AtStrategy } from '../common/strategies/at.strategy'
import { RtStrategy } from '../common/strategies/rt.strategy'
import { PrismaService } from './../prisma.service'
import { UsersModule } from './../users/users.module'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

@Module({
  imports: [PassportModule, UsersModule, JwtModule.register({})],
  providers: [AuthService, AuthResolver, PrismaService, AtStrategy, RtStrategy],
})
export class AuthModule {}
