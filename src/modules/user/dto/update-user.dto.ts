import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// https://www.npmjs.com/package/@nestjs/mapped-types
// PartialType 设置所有属性都变成非必填
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsInt()
  @ApiProperty({
    description: '用户ID',
  })
  id: number;
}
