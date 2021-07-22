import { EntityController } from '@all41-dev/server';
import { Request, Response, Router } from 'express';
import { LogEntryEntity } from '../models/log-entry.entity';

// tslint:disable-next-line: no-var-requires
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

export class LogEntryController extends EntityController<LogEntryEntity> {
  protected static _entity: LogEntryEntity;
  public static create(): Router {
    const router = Router();
    LogEntryController._entity = new LogEntryEntity;

    router.get('/', LogEntryController.getAll);
    router.get('/:id', LogEntryController.getById);
    router.post('/', LogEntryController.post);

    return router;
  }

  public static async getAll(req: Request, res: Response): Promise<void> {
    const entity = LogEntryController._entity;
    entity.setFilter({
      meta: req.query.meta,
      from: req.query.from ? new Date(req.query.from) : ((): Date => {
        const dt = new Date();
        dt.setDate(dt.getDate() - 1);
        return dt;
      })(),
      until: req.query.until ? new Date(req.query.until) : undefined,
      qand: req.query.qand,
      qor: req.query.qor,
      level: req.query.level,
    });
    entity.setIncludes(req.query.include);

    return entity?.get()
      .then((data): void => {
        const filteredRes = req.query.meta ? data.filter((le) => {
          const m: string | string[] | undefined = req.query.meta;
          if (!m) return true;
          const metaArr = typeof m === 'string' ? [m] : m;
          return metaArr.every((meta) => le.metas?.find((lem) => `${lem.key}:${lem.value}`.toLowerCase() === meta.toLowerCase()));
        }) : data;
        res.json(filteredRes)} )
      .catch((reason): void => {
        res.status(500).json(reason);
        throw new Error(reason);
      });
  }

  public static async getById(req: Request, res: Response): Promise<void> {
    return EntityController.getById(req, res, LogEntryController._entity, req.params.id);
  }

  public static async post(req: Request, res: Response): Promise<void> {
    return EntityController.post(req, res, LogEntryController._entity);
  }
}
