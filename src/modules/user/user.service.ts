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
import { ResponseMessage } from '../../types/http.interface';
// import { QueryInterface } from 'sequelize';


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
    return this.userRepository.findAll({
      raw: true, // 指定 Sequelize 不包装实例，直接返回数据，这样查询速度会更快
      paranoid: false, // 设置为 false 则返回已经被软删除的数据
      include: [{
        required: true, // 设置为 true 连表查询将变成 inner join ，默认则是 left join
        right: true, // 为 true 则设置为 right join ，required 为 true 则这行无效
      }],
      logging(sql, timing) {
        // 可做 sql 日志上报
        console.log(sql, timing);
      }
    });
  }

  // 根据id获取用户信息
  async getUserInfoById(id: number): Promise<User> {
    return this.userRepository.findByPk(id);
  }

  async getUserInfoByEmail(email: string) {
    return this.userRepository.scope({
      method: ['findByEmail', email],
    }).findOne();
  }

  // 登录
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

    // token 存入 redis, 设置过期时间24小时86400
    await this.redisService.set(`user_${user.id}_token`, token, 'EX', 86400);

    // 登录成功，返回信息
    return {
      user,
      token,
    }
  }

  // 创建用户
  async register(createUserDto: CreateUserDto): Promise<ResponseMessage> {
    // 根据邮箱查找用户是否已经存在
    const user = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      }
    });
    if (user) {
      throw new BadRequest('该用户已经存在');
    }

    // 验证用户的邮箱验证码
    const code = await this.redisService.get(`register_code_${createUserDto.email}`);
    if (!code || code !== createUserDto.code) {
      throw new BadRequest('该验证码错误或验证码已过期，请重新获取');
    }

    // 解密客户端的密码
    const loginPass = CryptoJS.AES
      .decrypt(createUserDto.password, this.configService.get('secretKey'))
      .toString(CryptoJS.enc.Utf8);

    // 再次更新密码加密，防止http请求过程中密码泄露
    const password = CryptoJS.AES
      .encrypt(loginPass, this.configService.get('secretKey'))
      .toString();

    const hasUser = await this.userRepository.create<User>({
      ...createUserDto,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'rainbow_admin',
      updatedBy: 'rainbow_admin',
    });

    if (hasUser) {
      return {
        resMessage: '注册成功'
      }
    }
    throw new BadRequest('用户注册失败，请稍后再试');
  }

  // 用户注册获取验证码
  async sendRegisterCode(registerUserCodeDto: RegisterUserCodeDto): Promise<ResponseMessage> {
    try {
      const code = getAuthCode();
      await this.emailService.sendMail({
        to: registerUserCodeDto.email,
        subject: '注册账号验证码',
        text: `您的验证码是: ${code}`,
      });

      // 验证码存储到 redis 中，设置过期时间10分钟
      await this.redisService.set(`register_code_${registerUserCodeDto.email}`, code, 'EX', 600);

      return {
        resMessage: '验证码已发送至您的邮箱，请查收',
      }
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
    return user.destroy({
      force: false // true 为物理删除，设置 false 则是软删除
    });
  }
}
