import {
  CanActivate,
  Injectable,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../roles.decorator';
import { AppException } from 'src/common/app.exception';
import { ErrorCode, ErrorMessage } from 'src/common/error.list';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !roles.includes(user.role)) {
      throw new AppException(
        ErrorCode.ROLE01,
        ErrorMessage.ROLE01,
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}
