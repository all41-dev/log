// import { RequestController } from '@all41-dev/server';
// import { Request, Response, Router } from 'express';
// import { MetaEntity } from '../models/meta.entity';

// export class MetaController extends RequestController<MetaEntity> {
//   public static create(): Router {
//     const router = Router();
//     const inst = new MetaController(MetaEntity);

//     router.get('/', inst.getAll);
//     router.get('/:id', inst.getById);
//     router.post('/', inst.post);

//     return router;
//   }

//   public async getAll(req: Request, res: Response): Promise<void> {
//     return super.getAll(req, res, this.getNewRequest());
//   }
//   public async getById(req: Request, res: Response): Promise<void> {
//     return super.getById(req, res, this.getNewRequest(), req.params.id);
//   }
//   public async post(req: Request, res: Response): Promise<void> {
//     return super.post(req, res, this.getNewRequest());
//   }
// }
