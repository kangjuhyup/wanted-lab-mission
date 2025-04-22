import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseDto } from '../dto/response.dto';

@Catch()
export class InternalExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // HttpException 이 아닌 경우 500 Internal Server Error로 처리
    const status = 
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    
    const message = 
      exception instanceof HttpException
        ? exception.message
        : '서버 내부 오류가 발생했습니다.';
    
    console.error(`상태: ${status}, 경로: ${request.url}`, exception);
    
    response
      .status(status)
      .json(ResponseDto.Fail({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: message,
      }));
  }
}
