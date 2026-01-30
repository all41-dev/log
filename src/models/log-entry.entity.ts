import { EntityRequest } from '@all41-dev/server';
import { DestroyOptions, FindOptions, Op, WhereAttributeHash } from 'sequelize';
import { LogEntry } from './log-entry';
import { Meta } from './meta';
import winston from 'winston';

export class LogEntryEntity extends EntityRequest<LogEntry, any> {
  public constructor() {
    super(LogEntry, LogEntry);
  }

  public setIncludes(includePaths: string |string[] | undefined): void {
    const includes = includePaths ? typeof includePaths === 'string' ? [includePaths] : includePaths : undefined;
    if (!includes) return;
    this._findOptions.include = [];

    if (includes.includes('meta')) {
      this._findOptions.include.push({model: Meta, as: 'metas', required: true});
    }
  }

  // noinspection JSMethodCanBeStatic
  public setFilter(filter: {
    meta?: string | string[];
    from?: Date;
    until?: Date;
    qand?: string | string[];
    qor?: string | string[];
    level?: string;
  }): void {
    const ands: WhereAttributeHash[] = [];

    // to be implemented on retrieved records
    //
    // const metaFilter = metaArr?.map((m) => /* include */ ({[Op.and]: { '$metas.key$': { [Op.eq]: m.split(':')[0] }, '$metas.value$': { [Op.eq]: m.split(':')[1] }}}));

    // if (metaFilter)
    //   ands.push(...metaFilter);

    if(filter.from)
      ands.push({ createdAt: { [Op.gte]: filter.from}})
    if(filter.until)
      ands.push({ createdAt: { [Op.lte]: filter.until}})
    if(filter.qand) {
      const qandArr = typeof filter.qand === 'string' ? [filter.qand] : filter.qand;
      const qandFilters = qandArr.map((q) => ({ message: { [Op.like]: `%${q}%` } }));
      ands.push(...qandFilters);
    }
    if(filter.qor) {
      const qorArr = typeof filter.qor === 'string' ? [filter.qor] : filter.qor;
      const qorFilters = qorArr.map((q) => ({ message: { [Op.like]: `%${q}%` } }));
      ands.push({[Op.or]: qorFilters});
    }
    if (filter.level) {
      const logger = winston.createLogger();
      const levels = Object.keys(logger.levels);
      const filterLevelValue = logger.levels[filter.level];
      if (filterLevelValue !== undefined) {// if undefined, then is invalid -> to be ignored
        const validLevels = levels.filter((l) => logger.levels[l] >= filterLevelValue);
        const lvlFilters = validLevels.map((vl) => ({ levelCode: vl }));
        ands.push({[Op.or]: lvlFilters});
      }
    }

    this._findOptions.where = ands.length === 0 ? {} : { [Op.and]: ands };
    this._findOptions.order = [['createdAt', 'DESC']];
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
