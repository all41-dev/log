import { Ui } from '@all41-dev/server';
import * as express from 'express';

export class LogUi extends Ui<LogUi> {

  public init(): express.Router {
    return this.getBaseRouter(`${__dirname}/../`);
  }

}
