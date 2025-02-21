import Transport from 'winston-transport';
import { LogEntry as WinstonLogEntry} from 'winston';
import { LogEntry } from './models/log-entry';
import { Meta } from './models/meta';
import util from 'util';
import { IWsOptions } from '@all41-dev/server';

export interface IWebSocketLogTransportOptions extends Transport.TransportStreamOptions {
  wsOptions: IWsOptions;
}

export class WebSocketLogTransportInstance extends Transport {
  constructor(options: IWebSocketLogTransportOptions) {
    super(options);
    // specific here
  }
  async log(info: WinstonLogEntry | (WinstonLogEntry & Error), next: any): Promise<any> {
    if (this.silent) { return next(null, true); }

    if (!info.meta)
      info.meta = {};

    const metaKeys = Object.keys(info).filter((k) => !['hash', 'level', 'timestamp', 'body', 'title'].includes(k));
    const metas = metaKeys.map((k) => {
      let value = (info as any)[k];
      if (typeof value === 'object') {
        // use util instead of JSON.stringify to handle possible circular reference here
        // see https://stackoverflow.com/a/18354289/1073588
        value = util.inspect(value);
      }
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
