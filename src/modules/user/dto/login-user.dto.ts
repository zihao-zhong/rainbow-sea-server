import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@app/db';

/**
 * 用户登录
 */
export class LoginUserDto {
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
  password: string;
}

export interface LoginUserInfo {
  token: string;
  user: Partial<User>,
}