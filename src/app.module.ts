import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { GoogleStrategy } from './auth/Googlestrategy.';

@Module({
  imports: [AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService,GoogleStrategy],
})
export class AppModule {}
