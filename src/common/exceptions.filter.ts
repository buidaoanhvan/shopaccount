import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorLog = {
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      statusCode: status,
      header: request.headers,
      body: request.body,
      message: exception,
    };

    this.logger.error(errorLog);

    const responseBody =
      exception instanceof HttpException
        ? exception.getResponse()
        : {
            errorCode: '99',
            message: 'Lỗi không xác định',
            success: false,
            statusCode: status,
          };

    response.status(status).json(responseBody);
  }
}
