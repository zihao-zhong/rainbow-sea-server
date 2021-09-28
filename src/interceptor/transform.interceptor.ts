import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseInterface } from '../types/http.interface';

/**
 * 用于拦截接口返回的数据，做一层处理
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResponseInterface<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseInterface<T>> {
    return next.handle().pipe(map(data => ({
			code: 200,
			message: '请求成功',
			data,
    })));
  }
}
