import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailModuleOptions {
  public global: boolean;
  public host: string;
  public port: number;
  public email: string;
  public password: string;
  public backendUrl: string;
  public frontendUrl: string;
  public fromAddress: string;
  public fromName: string;
  public replyTo?: string;
  public secure?: boolean;
}
