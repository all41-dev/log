import { EntityRequest } from '@all41-dev/server';
import { DestroyOptions, FindOptions, Op } from 'sequelize';
import { Meta } from './meta';

export class MetaEntity extends EntityRequest<Meta, Meta> {
  public constructor() {
    super(Meta);
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
        } as any,
      };
    } else { 
      this._findOptions.where = {
        Email: {[Op.ne]: null,} as any
      }}
  }

  // noinspection JSMethodCanBeStatic
  public async dbToClient(dbInst: Meta): Promise<Meta> {
    return dbInst;
  }

  // noinspection JSMethodCanBeStatic
  public async clientToDb(clientObj: Meta): Promise<Meta> {
    return clientObj;
  }

  public async preCreation(obj: Meta): Promise<Meta> {
    return obj;
  }
  public async postCreation(obj: Meta): Promise<Meta> {
    return obj;
  }

  public async preUpdate(obj: Meta): Promise<Meta> {
    return obj;
  }

  public async preDelete(id: string): Promise<number> {
    const options: DestroyOptions<any> = { where: { id: id } };
    return Meta.destroy(options);
  }
  public async getByPk(pk: any): Promise<Meta|null> {
    return this.dbFindByPk(pk).then((res) => {
      if (res) {
        return this.dbToClient(res)
      }
      throw new Error('not found');
    })
  }
  protected async dbFindByPk(pk: any): Promise<Meta|null> {
    return Meta.findByPk(pk);
  }

  protected async dbFindAll(options: FindOptions): Promise<Meta[]> {
    return Meta.findAll(options);
  }
  protected async dbDestroy(options: DestroyOptions<any>): Promise<number> {
    return Meta.destroy(options);
  }
}
