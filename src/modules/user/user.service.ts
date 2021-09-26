import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, USER_REPOSITORY } from '@app/db';
// import { BadRequest, Forbidden, NotFound } from '../../filter/common.filter';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
  ) {}

  // 获取用户列表
  async getUserList(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  // 根据id获取用户信息
  async getUserInfoById(id: number): Promise<User> {
    return this.userRepository.findByPk(id);
  }

  // 创建用户
  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create<User>({
      ...createUserDto,
      createdBy: '钟梓豪',
      updatedBy: '钟梓豪',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  
  // 修改用户信息
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUserInfoById(id);
    if (!user) throw new Error('找不到该用户');
    return user.update(updateUserDto);
  }

  // 删除用户
  async delete(id: number): Promise<void> {
    const user = await this.getUserInfoById(id);
    if (!user) throw new Error('找不到该用户');
    return user.destroy();
  }
}
