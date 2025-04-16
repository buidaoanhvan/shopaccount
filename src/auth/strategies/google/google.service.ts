import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';

@Injectable()
export class GoogleService extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.CLIENT_ID_GOOGLE ?? '',
      clientSecret: process.env.CLIENT_SECRET_GOOGLE ?? '',
      callbackURL: process.env.REDIRECT_URI_GOOGLE ?? '',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ) {
    const { id, emails, photos } = profile;
    const user: LoginUserDto = {
      id,
      email: emails?.[0]?.value,
      avatar: photos?.[0]?.value,
      provider: 'google',
    };
    done(null, user);
  }
}
