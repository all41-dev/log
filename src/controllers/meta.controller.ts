import { EntityController } from '@all41-dev/server';
import { Request, Response, Router } from 'express';
import { MetaEntity } from '../models/meta.entity';

// tslint:disable-next-line: no-var-requires
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

export class MetaController extends EntityController<MetaEntity> {
  private static inst: MetaController;
  public static create(): Router {
    const router = Router();

    router.get('/', MetaController.inst.getAll);
    router.get('/:id', MetaController.inst.getById);
    router.post('/', MetaController.inst.post);

    MetaController.inst = new MetaController(new MetaEntity);

    return router;
  }

  public async getById(req: Request, res: Response): Promise<void> {
    return super.getById(req, res, req.params.id);
  }
}
