import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResponseDto } from '@/common/dto/response.dto';

@Injectable()
export class GlobalExceptionInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((err) => {
                if (err instanceof HttpException) {
                    return throwError(() => err);
                }
                return of(ResponseDto.Fail(err.message || err));
            }),
        );
    }
}
