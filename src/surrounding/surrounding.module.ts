import { Module } from '@nestjs/common'
import { configService } from '../config/orm'
import { JwtModule } from '@nestjs/jwt'
import * as AutoIncrementFactory from 'mongoose-sequence'
import { AuthService } from '../auth/auth.service'
import { SurroundingService } from './surrounding.service'
import { SurroundingController } from './surrounding.controller'
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose'
import { Surrounding, SurroundingSchema } from '../model/surrounding'
import { Connection } from 'mongoose'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LogActivityModel } from '../model/log.activity.model'
import { LogLoginModel } from '../model/log.login.model'

@Module({
  controllers: [SurroundingController],
  imports: [
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([LogActivityModel, LogLoginModel], 'default'),
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
  ],
  providers: [SurroundingService, AuthService],
  exports: [SurroundingService, AuthService]
})
export class SurroundingModule { }
