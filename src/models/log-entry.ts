import { Model, Table, PrimaryKey, Default, DataType, Column, AllowNull, HasMany } from 'sequelize-typescript';
import { Meta, MetaClient } from './meta';

@Table({ tableName: 'logEntry' })
export class LogEntry extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id?: string;

  @AllowNull(false)
  // @Column(DataType.STRING(50))
  @Column(DataType.STRING)
  public levelCode!: string;

  @AllowNull(false)
  // @Column(DataType.STRING(500))
  @Column(DataType.STRING)
  public message!: string;

  @Column(DataType.DATE)
  public createdAt!: Date;

  @AllowNull
  @Column(DataType.TEXT)
  public callStack?: string;
  @HasMany((): typeof Meta => Meta)
  public metas?: MetaClient[];

}

export class LogEntryClient {
  id?: string;
  levelCode!: string;
  message!: string;
  createdAt!: Date;
  callStack?: string;
  metas?: MetaClient[];

  constructor(val?: Partial<LogEntryClient>) {
    Object.assign(this, val);
    if (val?.metas) {
      this.metas = [];
      val.metas.forEach(meta => {
        this.metas?.push(new MetaClient(meta));
      });
    }
  }
}
