import { Api } from '@all41-dev/server';
import { Router, Request, Response } from 'express';
import { LogEntryController } from './controllers/log-entry.controller';
import { MetaController } from './controllers/meta.controller';

/** Hosts route definitions and sequelize model initialization */
export class LogApi extends Api<LogApi> {
  public static inst: LogApi;
  public static req: Request;
  public static res: Response;
  public setStaticInst(): void { LogApi.inst = this; }

  public init(): Router {

    this.router.use('/log-entry', LogEntryController.create());
    this.router.use('/meta', MetaController.create());

    return this.router;
  }
}
