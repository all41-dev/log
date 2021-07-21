import { Model, Table, PrimaryKey, DataType, Column, AllowNull, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { LogEntry, LogEntryClient } from './log-entry';

@Table({ tableName: 'meta', timestamps: false })
export class Meta extends Model {
  @PrimaryKey
  @AllowNull(false)
  @ForeignKey((): typeof Model => LogEntry)
  @Column(DataType.UUID)
  public logEntryUuid?: string;

  @PrimaryKey
  @AllowNull(false)
  // @Column(DataType.STRING(200))
  @Column(DataType.STRING)
  public key!: string;

  @AllowNull(false)
  // @Column(DataType.STRING(200))
  @Column(DataType.STRING)
  public value!: string;

  @BelongsTo((): typeof Model => LogEntry)
  public logEntry?: LogEntry;

}
export class MetaClient {
  logEntryUuid?: string;
  key!: string;
  value!: string;
  logEntry?: LogEntryClient;

  constructor(val?: Partial<MetaClient>) {
    Object.assign(this, val);
  }
}