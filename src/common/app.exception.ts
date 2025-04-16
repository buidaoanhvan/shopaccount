import { HttpException, HttpStatus } from '@nestjs/common';
export class AppException extends HttpException {
  public readonly errorCode: string;

  constructor(errorCode: string, message: string, status: HttpStatus) {
    super({ errorCode, message, success: false, statusCode: status }, status);
    this.errorCode = errorCode;
  }
}
