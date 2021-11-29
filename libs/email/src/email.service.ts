import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 发送邮件
   * @param params {SendMailParams} 发送邮件参数
   */
  public async sendMail(params: ISendMailOptions): Promise<any> {
    return this.mailerService.sendMail({
      ...params,
      from: this.configService.get('email').user,
    });
  }
}
