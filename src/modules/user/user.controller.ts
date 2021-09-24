import { Controller, Get, Post, Body, Patch, Query, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@app/db';

@ApiTags('用户模块接口')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  async getUserList(): Promise<User[]> {
    return this.userService.getUserList();
  }

  @Get('info')
  async getUserInfoById(@Query('id') id: string): Promise<User> {
    return this.userService.getUserInfoById(+id);
  }

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Patch('update')
  async update(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    const { id } = updateUserDto;
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('delete')
  async delete(@Query('id') id: string): Promise<void> {
    return this.userService.delete(+id);
  }
}
