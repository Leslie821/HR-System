import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './local-auth.guard';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2w' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    // JwtStrategy,
    LocalAuthGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
