import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException, BadRequestException } from '@nestjs/common';
import { Observable, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

/**
 * 做一个请求超时的拦截器，目前定义为10秒后过期
 */
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(10000),
      catchError(err => {
        if (err instanceof TimeoutError) {
          throw new RequestTimeoutException('请求超时');
        }
        // 错误兜底
        throw new BadRequestException(`TimeoutInterceptor: ${err}`);
      }),
    );
  };
};
