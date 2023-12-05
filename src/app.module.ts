import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { database_config } from './configs/configuration.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: (function () {
        console.log(process.env.NODE_ENV);
        console.log(
          process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
        );
        return process.env.NODE_ENV === 'development' ? '.env.dev' : '.env';
      })(),
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().port().required(),
        DATABASE_PORT: Joi.number().port().required(),
        DATABASE_USERNAME: Joi.string().min(4).required(),
        DATABASE_PASSWORD: Joi.string().min(4).required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_URI: Joi.string().required(),
      }),
      validationOptions: {
        abortEarly: false,
      },
      load: [database_config],
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
