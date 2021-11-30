import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto, RegisterUserCodeDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto, LoginUserInfo } from './dto/login-user.dto';
import { User, USER_REPOSITORY } from '@app/db';
import { BadRequest, Forbidden, NotFound } from '../../filter/common.filter';
import { ConfigService } from '@nestjs/config';
import { getAuthCode } from '@app/tools';
import { EmailService } from '@app/email';
import * as CryptoJS from 'crypto-js';
import * as Jwt from 'jsonwebtoken';


@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  // 获取用户列表
  async getUserList(): Promise<User[]> {
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
      // 后续做当天密码输入错误上限限制，超出不让再此进行登录，走忘记密码
      throw new BadRequest('密码错误，请检查您的密码');
    }

    // 检验成功，生成 token
    const token = Jwt.sign({ data: user.email }, this.configService.get('signKey'));

    // token 存入 redis

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
      createdBy: '钟梓豪',
      updatedBy: '钟梓豪',
      createdAt: new Date(),
      updatedAt: new Date(),
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
