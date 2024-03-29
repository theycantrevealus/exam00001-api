import { ServeStaticModule } from '@nestjs/serve-static'
import { AuthModule } from './auth/auth.module'
import { AccountModule } from './account/account.module'
import { AccountController } from './account/account.controller'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthController } from './auth/auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MenuModule } from './menu/menu.module'
import { configService } from './config/orm'
import { LogModule } from './log/log.module'
import { MenuController } from './menu/menu.controller'
import { LogController } from './log/log.controller'
import { LogService } from './log/log.service'
import { LoggingInterceptor } from './interceptor/logging'
import { JwtModule } from '@nestjs/jwt'
import { AccountModel } from './model/account.model'
import { LogActivityModel } from './model/log.activity.model'
import { AccountService } from './account/account.service'
import { LogLoginModel } from './model/log.login.model'
import { join } from 'path'
import { LicenseModule } from './license/license.module'
import { LicenseController } from './license/license.controller'
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose'
import * as AutoIncrementFactory from 'mongoose-sequence'
import { Connection } from 'mongoose'
import { Surrounding, SurroundingSchema } from './model/surrounding'
import { SurroundingController } from './surrounding/surrounding.controller'
import { SurroundingModule } from './surrounding/surrounding.module'

@Module({
  imports: [
    AuthModule,
    SurroundingModule,
    AccountModule,
    MenuModule,
    LogModule,
    LicenseModule,
    MongooseModule.forRoot(`${process.env.MONGO_CONNECTION}`),
    MongooseModule.forFeatureAsync([
      {
        name: Surrounding.name,
        useFactory: async (connection: Connection) => {
          const schema = SurroundingSchema;
          const AutoIncrement = AutoIncrementFactory(connection);
          schema.plugin(AutoIncrement, { inc_field: 'id' });
          return schema;
        },
        inject: [getConnectionToken()],
      }
    ]),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([LogLoginModel, LogActivityModel], 'default'),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'avatar'),
      exclude: ['/api*'],
      serveRoot: '/avatar'
    })
  ],
  controllers: [
    AccountController,
    SurroundingController,
    MenuController,
    LogController,
    AuthController,
    LicenseController,
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule { }
