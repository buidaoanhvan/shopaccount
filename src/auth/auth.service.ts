import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginKeyDto } from './dto/login-key.dto';
import { AppException } from 'src/common/app.exception';
import { ErrorCode, ErrorMessage } from 'src/common/error.list';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async providerCallBack(payload: LoginUserDto) {
    let user = await this.userService.getUserByEmail(payload.email);
    if (!user) {
      user = await this.userService.createUser(payload);
    }
    //tạo key đăng nhập
    const key = await this.userService.createKeyLogin(user);
    return key?.id;
  }

  async providerLogin(data: LoginKeyDto) {
    const keyLogin = await this.userService.checkKeyLogin(data.key);
    if (!keyLogin || keyLogin.expires_at < new Date()) {
      throw new AppException(
        ErrorCode.KEY01,
        ErrorMessage.KEY01,
        HttpStatus.OK,
      );
    }
    // lấy user
    const user = await this.userService.getUserById(keyLogin.user_id);
    if (!user) {
      throw new AppException(ErrorCode.LOG01, ErrorCode.LOG01, HttpStatus.OK);
    }
    //tạo key đăng nhập
    const session = await this.userService.createSession(user);
    //delete key login
    await this.userService.deleteKeyLogin(keyLogin.id);
    //tạo token
    const payloadToken = {
      email: user.email,
      sub: user.id,
      session: session?.id,
      avatar: user.avatar_url,
      role: user.role,
    };
    const token = this.jwtService.sign(payloadToken);
    return token;
  }
}
