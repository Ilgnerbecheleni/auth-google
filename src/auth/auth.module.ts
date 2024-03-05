/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './Googlestrategy.';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  exports:[AuthService]
})
export class AuthModule {}
