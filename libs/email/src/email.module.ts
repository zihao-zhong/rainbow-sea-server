/**
 * 官方文档 https://nest-modules.github.io/mailer/docs/mailer
 */

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: 'smtp.exmail.qq.com', //邮箱服务器地址
          port: 465, //服务器端口 默认 465
          auth: {
            user: configService.get('email').user, //你的邮箱地址
            pass: configService.get('email').password,
          },
        },
        defaults: {
          from: '1095996920@qq.com',  // 测试邮箱
        },
        preview: true, //是否开启预览，开启了这个属性，在调试模式下会自动打开一个网页，预览邮件
      }),
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
