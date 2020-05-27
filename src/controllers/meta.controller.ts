import { EntityController } from '@all41-dev/server';
import { Request, Response, Router } from 'express';
import { MetaEntity } from '../models/meta.entity';

// tslint:disable-next-line: no-var-requires
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

export class MetaController extends EntityController<MetaEntity> {
  protected static _entity: MetaEntity;
  public static create(): Router {
    const router = Router();
    MetaController._entity = new MetaEntity;

    router.get('/', MetaController.getAll);
    router.get('/:id', MetaController.getById);
    router.post('/', MetaController.post);

    return router;
  }

  public static async getAll(req: Request, res: Response): Promise<void> {
    return EntityController.getAll(req, res, MetaController._entity);
  }
  public static async getById(req: Request, res: Response): Promise<void> {
    return EntityController.getById(req, res, MetaController._entity, req.params.id);
  }
  public static async post(req: Request, res: Response): Promise<void> {
    return EntityController.post(req, res, MetaController._entity);
  }
}
