import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto, UserRegisterCodeDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, USER_REPOSITORY } from '@app/db';
import { BadRequest, Forbidden, NotFound } from '../../filter/common.filter';
import { getAuthCode } from '@app/tools';
import { EmailService } from '@app/email';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
    private readonly emailService: EmailService,
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
  async register(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create<User>({
      ...createUserDto,
      createdBy: '钟梓豪',
      updatedBy: '钟梓豪',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // 用户注册获取验证码
  async sendRegisterCode(userRegisterCodeDto: UserRegisterCodeDto): Promise<string> {
    try {
      const code = getAuthCode();
      await this.emailService.sendMail({
        to: userRegisterCodeDto.email,
        subject: '注册账号验证码',
        text: `您的验证码是： ${code}`,
        // template: 'code.ejs',
        // context: {
        //   code,
        //   sign: '彩虹海',
        //   date: new Date(),
        // }
      });
      return '验证码已发送至您的邮箱，请查收';
    } catch (e) {
      throw new BadRequest('邮件发送失败，请稍后重试');
    }
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
