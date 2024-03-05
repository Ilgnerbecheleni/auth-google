import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { GoogleStrategy } from './auth/Googlestrategy.';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule],
  controllers: [AppController, AuthController,UsersController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
