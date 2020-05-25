import { Entity } from '@all41-dev/server';
import { DestroyOptions, FindOptions, Op } from 'sequelize';
import { LogEntry } from './log-entry';

export class LogEntryEntity extends Entity<LogEntry, LogEntry> {
  public constructor() {
    super(LogEntry);
  }

  public setIncludes(_includePaths: string[]): void {
    //
  }

  // noinspection JSMethodCanBeStatic
  public setFilter(filter?: string): void {
    // const filter: string | undefined = req.query.filter;
    if (filter !== undefined) {
      this._findOptions.where = {
        Email: {
          [Op.and]: {
            [Op.like]: `%${filter}%`,
            [Op.ne]: null,
          }
        },
      };
    } else { 
      this._findOptions.where = {
        Email: {[Op.ne]: null,}
      }}
  }

  // noinspection JSMethodCanBeStatic
  public async dbToClient(dbInst: LogEntry): Promise<LogEntry> {
    return dbInst;
  }

  // noinspection JSMethodCanBeStatic
  public async clientToDb(clientObj: LogEntry): Promise<LogEntry> {
    return clientObj;
  }

  public async preCreation(obj: LogEntry): Promise<LogEntry> {
    return obj;
  }
  public async postCreation(obj: LogEntry): Promise<LogEntry> {
    return obj;
  }

  public async preUpdate(obj: LogEntry): Promise<LogEntry> {
    return obj;
  }

  public async preDelete(id: string): Promise<number> {
    const options: DestroyOptions = { where: { id: id } };
    return LogEntry.destroy(options);
  }
  public async getByPk(pk: any): Promise<LogEntry|null> {
    return this.dbFindByPk(pk).then((res) => {
      if (res) {
        return this.dbToClient(res)
      }
      throw new Error('not found');
    })
  }
  protected async dbFindByPk(pk: any): Promise<LogEntry|null> {
    return LogEntry.findByPk(pk);
  }

  protected async dbFindAll(options: FindOptions): Promise<LogEntry[]> {
    return LogEntry.findAll(options);
  }
  protected async dbDestroy(options: DestroyOptions): Promise<number> {
    return LogEntry.destroy(options);
  }
}
