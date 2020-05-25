import { EntityController } from '@all41-dev/server';
import { Request, Response, Router } from 'express';
import { LogEntryEntity } from '../models/log-entry.entity';

// tslint:disable-next-line: no-var-requires
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

export class LogEntryController extends EntityController<LogEntryEntity> {
  private static inst: LogEntryController;
  public static create(): Router {
    const router = Router();

    router.get('/', LogEntryController.inst.getAll);
    router.get('/:id', LogEntryController.inst.getById);
    router.post('/', LogEntryController.inst.post);

    LogEntryController.inst = new LogEntryController(new LogEntryEntity);

    return router;
  }

  public async getById(req: Request, res: Response): Promise<void> {
    return super.getById(req, res, req.params.id);
  }
}
