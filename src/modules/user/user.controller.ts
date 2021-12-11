import {
  Controller, Get, Post, Body, Patch, Query, Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@app/db';
import { UserService } from './user.service';
import { CreateUserDto, RegisterUserCodeDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto, LoginUserInfo } from './dto/login-user.dto';
import { ResponseMessage } from '../../types/http.interface';

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

  @Post('login')
  @ApiTags('登录接口')
  async info(@Body() loginUserDto: LoginUserDto): Promise<LoginUserInfo> {
    return this.userService.login(loginUserDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<ResponseMessage> {
    return this.userService.register(createUserDto);
  }

  @Post('register/code')
  async sendRegisterCode(@Body() registerUserCodeDto: RegisterUserCodeDto): Promise<ResponseMessage> {
    return this.userService.sendRegisterCode(registerUserCodeDto);
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
