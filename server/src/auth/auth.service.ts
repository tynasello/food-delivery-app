import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthenticationError } from 'apollo-server-express'
import * as bcrypt from 'bcrypt'
import { Tokens } from 'src/types'
import { User } from 'src/users/models/user.model'
import { CreateUserDto } from '../../src/users/dto'
import { PrismaService } from './../prisma.service'
import { UsersService } from './../users/users.service'
import { LoginSignupResponse, LogoutResponse, RefreshResponse } from './dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  signup = async (
    createUserInput: CreateUserDto
  ): Promise<LoginSignupResponse> => {
    const passwordHash = await bcrypt.hash(createUserInput.password, 10)

    const newUser = await this.usersService.create({
      ...createUserInput,
      password: passwordHash,
    })

    // create at and rt for user and then upsert rt to user table in db
    const tokens = await this.createTokens(newUser)
    await this.upsertRt(newUser.username, tokens.rt)

    return { ...newUser, ...tokens }
  }

  login = async ({ username, password }): Promise<LoginSignupResponse> => {
    const user = await this.usersService.findOne(username)
    const correctPassword = await bcrypt.compare(password, user.password)
    if (!correctPassword)
      throw new AuthenticationError(
        `Incorrect password for user ${user.username}`
      )
    // create at and rt for user and then upsert rt to user table in db
    const tokens = await this.createTokens(user)
    await this.upsertRt(user.username, tokens.rt)
    return { ...user, ...tokens }
  }

  logout = async (username: string): Promise<LogoutResponse> => {
    await this.usersService.findOne(username)

    // delete rt from user table if user logs out
    await this.prisma.user.updateMany({
      where: {
        username,
        rt: {
          not: null,
        },
      },
      data: {
        rt: null,
      },
    })
    return { username }
  }

  refreshTokens = async (
    username: string,
    rt: string
  ): Promise<RefreshResponse> => {
    const user = await this.usersService.findOne(username)
    if (!user.rt)
      throw new AuthenticationError(
        `No refresh token in database for user: ${user.username}`
      )
    const correctRt = await bcrypt.compare(rt, user.rt)
    if (!correctRt)
      throw new AuthenticationError(
        `Incorrect refresh token for user: ${user.username}`
      )

    const at = await this.refreshAt(user)
    return { at }
  }

  // helpers
  // ------------------------------------------------------------------

  createTokens = async (user: User): Promise<Tokens> => {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          username: user.username,
          sub: user.id,
        },
        {
          secret: process.env.AT_SECRET,
          expiresIn: 600,
        }
      ),
      this.jwtService.signAsync(
        {
          username: user.username,
          sub: user.id,
        },
        {
          secret: process.env.RT_SECRET,
          expiresIn: 604800,
        }
      ),
    ])
    return { at, rt }
  }

  refreshAt = async (user: User): Promise<string> => {
    const [at] = await Promise.all([
      this.jwtService.signAsync(
        {
          username: user.username,
          sub: user.id,
        },
        {
          secret: process.env.AT_SECRET,
          expiresIn: 600,
        }
      ),
    ])
    return at
  }

  upsertRt = async (username: string, rt: string): Promise<void> => {
    const rtHash = await bcrypt.hash(rt, 10)
    await this.prisma.user.update({
      where: {
        username,
      },
      data: {
        rt: rtHash,
      },
    })
  }
}
