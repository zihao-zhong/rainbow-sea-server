import { IsString, IsDate, IsEmail, IsMobilePhone } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: '用户名',
  })
  username: string;

  @IsMobilePhone('zh-CN', {}, {
    message: '请输入正确的电话号码',
  })
  @ApiProperty({
    description: '电话号码',
  })
  phone: string;

  @IsEmail()
  @ApiProperty({
    description: '邮件地址',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'qq号码',
  })
  qq: string;
}
