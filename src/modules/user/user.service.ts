import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto, RegisterUserCodeDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto, LoginUserInfo } from './dto/login-user.dto';
import { User, USER_REPOSITORY } from '@app/db';
import { BadRequest } from '../../filter/common.filter';
import { ConfigService } from '@nestjs/config';
import { getAuthCode } from '@app/tools';
import { EmailService } from '@app/email';
import { IRedisService } from '@app/redis';
import * as CryptoJS from 'crypto-js';
import * as Jwt from 'jsonwebtoken';


@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
    private readonly redisService: IRedisService,
  ) {}

  // 获取用户列表
  async getUserList(): Promise<User[]> {
    const res1 = await this.redisService.set('name', 'zhong');
    const res2 = await this.redisService.get('name');
    console.log(res1, res2, '------------');
    return this.userRepository.findAll();
  }

  // 根据id获取用户信息
  async getUserInfoById(id: number): Promise<User> {
    return this.userRepository.findByPk(id);
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginUserInfo> {
    const user = await this.userRepository.findOne({
      where: {
        email: loginUserDto.email,
      }
    });
    if (!user) {
      throw new BadRequest('用户邮箱不存在，请检查邮箱地址或用此邮箱注册新用户');
    }

    // 解密客户端的密码
    const loginPass = CryptoJS.AES
      .decrypt(loginUserDto.password, this.configService.get('secretKey'))
      .toString(CryptoJS.enc.Utf8);

    // 解密数据库存储的密码
    const userPass = CryptoJS.AES
      .decrypt(user.password, this.configService.get('secretKey'))
      .toString(CryptoJS.enc.Utf8);

    if (loginPass !== userPass) {
      // 后续做当天密码输入错误上限限制，超出不让再次进行登录，走忘记密码流程
      throw new BadRequest('密码错误，请检查您的密码');
    }

    // 检验成功，生成 token
    const token = Jwt.sign({ data: user.email }, this.configService.get('signKey'));

    // token 存入 redis

    // 登录成功，返回信息
    return {
      token,
      user: {
        ...user,
        password: null,
      },
    }
  }

  // 创建用户
  async register(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      }
    });
    if (user) {
      throw new BadRequest('该用户已经存在');
    }

    // 解密客户端的密码
    const loginPass = CryptoJS.AES
      .decrypt(createUserDto.password, this.configService.get('secretKey'))
      .toString(CryptoJS.enc.Utf8);

    // 再次更新密码加密，防止http请求过程中密码泄露
    const password = CryptoJS.AES
      .encrypt(loginPass, this.configService.get('secretKey'))
      .toString();

    return this.userRepository.create<User>({
      ...createUserDto,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'rainbow_admin',
      updatedBy: 'rainbow_admin',
    });
  }

  // 用户注册获取验证码
  async sendRegisterCode(registerUserCodeDto: RegisterUserCodeDto): Promise<string> {
    try {
      const code = getAuthCode();
      await this.emailService.sendMail({
        to: registerUserCodeDto.email,
        subject: '注册账号验证码',
        text: `您的验证码是： ${code}`,
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
