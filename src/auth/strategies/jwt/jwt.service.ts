import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtService extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const session = await this.userService.checkSession(payload.session);
    if (!session) {
      throw new UnauthorizedException('Session not found');
    }
    if (session.expires_at < new Date()) {
      throw new UnauthorizedException('Session expired');
    }
    console.log(payload);

    return payload;
  }
}
