import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { join, resolve } from 'path';
import hbs from 'nodemailer-express-handlebars';
import { EmailModuleOptions } from './email-module.options';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  public constructor(private config: EmailModuleOptions) {
    this.transporter = createTransport({
      host: this.config.host,
      port: this.config.port,
      secure: this.config.secure ?? true,
      auth: {
        user: this.config.email,
        pass: this.config.password,
      },
    });

    const viewPath = resolve(join(process.cwd(), 'assets', 'emails'));

    this.transporter.use(
      'compile',
      hbs({
        viewEngine: {
          partialsDir: join(viewPath, 'partials'),
          layoutsDir: join(viewPath, 'layouts'),
          defaultLayout: 'default.hbs',
        },
        viewPath: join(viewPath, 'views'),
        extName: '.hbs',
      }),
    );
  }

  public sendMail(options: any): Promise<any> {
    options.from = {
      address: this.config.fromAddress,
      name: this.config.fromName,
    };

    options.replyTo = this.config.replyTo || this.config.fromAddress;

    return this.transporter.sendMail(options);
  }
}
