// import { RequestController } from '@all41-dev/server';
// import { Request, Response, Router } from 'express';
// import { LogEntryEntity } from '../models/log-entry.entity';

// export class LogEntryController extends RequestController<LogEntryEntity> {
//   public static create(): Router {
//     const router = Router();
//     const inst = new LogEntryController(LogEntryEntity);

//     router.get('/', inst.getAll);
//     router.get('/:id', inst.getById);
//     router.post('/', inst.post);

//     return router;
//   }

//   public async getAll(req: Request, res: Response): Promise<void> {
//     const entity = this.getNewRequest();
//     entity.setFilter({
//       meta: req.query.meta?.toString(),
//       from: req.query.from ? new Date(req.query.from.toString()) : ((): Date => {
//         const dt = new Date();
//         dt.setDate(dt.getDate() - 1);
//         return dt;
//       })(),
//       until: req.query.until ? new Date(req.query.until.toString()) : undefined,
//       qand: req.query.qand?.toString(),
//       qor: req.query.qor?.toString(),
//       level: req.query.level?.toString(),
//     });
//     entity.setIncludes(req.query.include?.toString());

//     return entity?.get()
//       .then((data): void => {
//         const filteredRes = req.query.meta ? data.filter((le) => {
//           const m: string | string[] | undefined = req.query.meta?.toString();
//           if (!m) return true;
//           const metaArr = typeof m === 'string' ? [m] : m;
//           return metaArr.every((meta) => le.metas?.find((lem) => `${lem.key}:${lem.value}`.toLowerCase() === meta.toLowerCase()));
//         }) : data;
//         res.json(filteredRes)} )
//       .catch((reason): void => {
//         res.status(500).json(reason);
//         throw new Error(reason);
//       });
//   }

//   public async getById(req: Request, res: Response): Promise<void> {
//     return super.getById(req, res, this.getNewRequest(), req.params.id);
//   }

//   public async post(req: Request, res: Response): Promise<void> {
//     return super.post(req, res, this.getNewRequest());
//   }
// }
