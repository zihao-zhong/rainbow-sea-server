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
    return next.handle().pipe(map(
      ret => {
        /**
         * 做一层处理，如果要自定义返回信息，请使用这个格式
         * {
         *    resMessage: '阿瓦达啃大瓜',
         *    data: any
         * }
         */
        const { resMessage } = ret;
        return {
          code: 200,
          message: resMessage || '请求成功',
          data: (resMessage) ? ret.data : ret,
        }
      }
    ));
  }
}
