import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { FoodModule } from './food/food.module'
import { CategoryModule } from './categories/category.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UsersModule,
    AuthModule,
    FoodModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
