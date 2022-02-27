import { RtStrategy } from '../common/strategies/rt.strategy'
import { AtStrategy } from '../common/strategies/at.strategy'
import { UsersModule } from './../users/users.module'
import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { PrismaService } from 'src/prisma.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

@Module({
    imports: [PassportModule, UsersModule, JwtModule.register({})],
    providers: [
        AuthService,
        AuthResolver,
        PrismaService,
        AtStrategy,
        RtStrategy,
    ],
})
export class AuthModule {}
