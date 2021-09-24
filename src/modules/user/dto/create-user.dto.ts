import { IsString, IsDate, IsEmail, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: '用户名',
  })
  username: string;

  @IsPhoneNumber('CH', {
    message: '请输入正确的电话号码',
  })
  @ApiProperty({
    description: '电话号码',
  })
  phone: string;

  @IsEmail(null, {
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
  qq: string;

  @IsString()
  @ApiProperty({
    description: '创建人',
  })
  createdBy: string;

  @IsString()
  @ApiProperty({
    description: '修改人',
  })
  updatedBy: string;

  @IsDate()
  @ApiProperty({
    description: '创建时间',
  })
  createdAt: Date;

  @IsDate()
  @ApiProperty({
    description: '修改时间',
  })
  updatedAt: Date;
}
