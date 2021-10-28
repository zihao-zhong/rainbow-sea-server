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
   * @param param {SendMailParams} 发送邮件参数
   */
  public async sendMail(param: ISendMailOptions): Promise<any> {
    return await this.mailerService.sendMail({
      to: param.to,
      text: param.text,
      html: param.html,
      subject: param.subject,
      from: this.configService.get('companyEmail'),
    });
  }
}
