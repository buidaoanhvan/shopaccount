import { HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppException } from 'src/common/app.exception';
import { ErrorCode, ErrorMessage } from 'src/common/error.list';

export class JwtGuard extends AuthGuard('jwt') {
  //bắt lỗi
  handleRequest(err, user, info) {
    if (err || !user) {
      throw new AppException(
        ErrorCode.AUTH01,
        ErrorMessage.AUTH01,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
