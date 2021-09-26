import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * 用户输入错误方法
 * @param {string} message 错误信息
 */
export class BadRequest extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

/**
 * 没权限时的错误方法
 * @param {string} message 错误信息
 */
export class Forbidden extends HttpException {
  constructor(message: string = '抱歉，您暂无权限操作') {
    super(message, HttpStatus.FORBIDDEN);
  }
}

/**
 * 404找不到资源的方法
 * @param {string} message 错误信息
 */
export class NotFound extends HttpException {
  constructor(message: string = '抱歉，找不到该资源') {
    super(message, HttpStatus.NOT_FOUND);
  }
}