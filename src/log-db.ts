import { LogEntry } from './models/log-entry';
import { Meta } from './models/meta';
import { Db } from '@all41-dev/db-tools';

export class LogDb extends Db<LogDb> {
  public async init(): Promise<void> {
    // if (this.isInitialized) { return; }
    await this._init();
    LogDb.inst = this;
    this.sequelize.addModels([LogEntry, Meta]);
  }
}
