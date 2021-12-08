/**
 * 官方文档 https://nest-modules.github.io/mailer/docs/mailer
 * 使用教程 https://blog.csdn.net/qq_33270001/article/details/114990427
 */

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
// import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
// import * as path from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: 'smtp.exmail.qq.com', //邮箱服务器地址
          port: 465, //服务器端口 默认 465
          auth: configService.get('email'),
        },
        defaults: {
          from: '1095996920@qq.com',  // 测试邮箱
        },
        preview: false, //是否开启预览，开启了这个属性，在调试模式下会自动打开一个网页，预览邮件
        // template: {
        //   dir: path.join(process.cwd(), '../template/'),
        //   adapter: new EjsAdapter(),
        //   options: {
        //     strict: true, // 严格模式
        //   }
        // }
      }),
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
