import Transport from 'winston-transport';
import { LogEntry as WinstonLogEntry} from 'winston';
import { Db, IDbOptions } from '@all41-dev/db-tools';
import { LogDb } from './log-db';
import { LogEntry } from './models/log-entry';
import { Meta } from './models/meta';

export interface IDbLogTransportOptions extends Transport.TransportStreamOptions {
  db: IDbOptions<LogDb>;
}

export class DbLogTransportInstance extends Transport {
  db: Db<any>;
  dbInit: Promise<void>;
  constructor(options: IDbLogTransportOptions) {
    super(options);
    this.db = new LogDb(options.db);
    this.dbInit = this.db.init();
  }
  async log(info: WinstonLogEntry | (WinstonLogEntry & Error), next: any): Promise<any> {
    if (this.silent) { return next(null, true); }
    await this.dbInit;

    if (!info.meta)
      info.meta = {};

    const metaKeys = Object.keys(info).filter((k) => !['hash', 'level', 'timestamp', 'meta', 'body', 'title'].includes(k));
    const metas = metaKeys.map((k) => {
      let value = (info as any)[k];
      if (typeof value === 'object') value = JSON.stringify(value, null, 2);
      else if (typeof value !== 'string') value = `${value}`;
      const meta = new Meta({ key: k, value } as Partial<Meta>);
      return meta;
    });

    const logEntry = new LogEntry(info instanceof Error ? {
      levelCode: info.level,
      message: info.message,
      callStack: info.stack
    } : {
      levelCode: info.level,
      message: info.message,
    } as Partial<LogEntry>);
    await logEntry.save();
    for (const meta of metas) {
      meta.logEntryUuid = logEntry.id;
      await meta.save();
    }

    return next(null, true);
  }
}
