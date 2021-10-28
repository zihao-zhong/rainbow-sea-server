import { IsString, IsDate, IsEmail, IsMobilePhone } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * 用户注册
 */
export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: '用户名',
  })
  username?: string;

  @IsMobilePhone('zh-CN', {}, {
    message: '请输入正确的电话号码',
  })
  @ApiProperty({
    description: '电话号码',
  })
  phone?: string;

  @IsEmail({}, {
    message: '请输入正确的邮件地址',
  })
  @ApiProperty({
    description: '邮件地址',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'qq号码',
  })
  qq?: string;
}

/**
 * UserRegisterCode 注册时获取验证码的接口传参类型
 */
export class UserRegisterCodeDto {
  @IsEmail({}, {
    message: '请输入正确的邮件地址',
  })
  @ApiProperty({
    description: '邮件地址',
  })
  email: string;
}
