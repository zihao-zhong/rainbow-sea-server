import { IsString, IsDate, IsEmail, IsMobilePhone } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * 用户注册
 */
export class CreateUserDto {
  @IsEmail({}, {
    message: '请输入正确的邮件地址',
  })
  @ApiProperty({
    description: '邮件地址',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: '密码',
  })
  password?: string;

  @IsString()
  @ApiProperty({
    minLength: 6,
    maxLength: 6,
    description: '验证码',
  })
  code: string;
}

/**
 * UserRegisterCode 注册时获取验证码的接口传参类型
 */
export class RegisterUserCodeDto {
  @IsEmail({}, {
    message: '请输入正确的邮件地址',
  })
  @ApiProperty({
    description: '邮件地址',
  })
  email: string;
}
