/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationBase, Config as CompConfig } from '@all41-dev/ui-components';
import {OAuthService} from 'angular-oauth2-oidc';
import { Config } from '../app.config';
import { LogEntryClient } from '../../../models/log-entry';
import { TabulatorExtendedOptions } from '@all41-dev/ui-components/lib/tabulator/tabulator.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  styleUrls: ['./main.component.css'],
  templateUrl: './main.component.html',
})
export class MainComponent extends AuthenticationBase {
  public title = 'logs manager';

  private _logEntries?: Tabulator;
  public get logEntries(): Tabulator | undefined { return this._logEntries; }
  public set logEntries(value: Tabulator | undefined) {
    this._logEntries = value;
    //this._setDocumentListValues();
  }
  public get selectedLogEntry(): LogEntryClient | undefined {
    const sr = this.logEntries?.getSelectedRows()?.[0];
    if (!sr) return;
    return sr.getData();
  }
  public logEntriesExtOptions?: TabulatorExtendedOptions<LogEntryClient>;
  public logEntriesOptions?: Tabulator.Options;

  private _fromDt?: string;
  public get fromDt(): string | undefined {
    return this._fromDt;
  }
  public set fromDt(dt: string | undefined) {
    this._fromDt = dt;
    this.refresh();
  }
  private _toDt?: string;
  public get toDt(): string | undefined {
    return this._toDt;
  }
  public set toDt(dt: string | undefined) {
    this._toDt = dt;
    this.refresh();
  }
  baseLogUrl = 'api/log-entry?include=meta';

  public constructor(public http: HttpClient, oauthService: OAuthService, private route: ActivatedRoute, compConfig: CompConfig) {
    super(oauthService, compConfig);
  }

  public async afterAuthInit(): Promise<void> {
    this.logEntriesExtOptions = {
      factory: LogEntryClient,
      pkProp: 'id',
      isAddEnabled: false,
      isDeleteEnabled: false,
    }

    this.logEntriesOptions = {
      ajaxURL: this.baseLogUrl,
      height: '50vh',
      selectable: 1,
      columns: [
        { title: '', formatter: "rowSelection", titleFormatter: "rowSelection", hozAlign: "center", headerSort: false },
        { title: 'level', field: 'levelCode', headerFilter: 'select', headerFilterParams: { values: true } },
        { title: 'at', field: 'createdAt', },
        { title: 'message', field: 'message', },
      ],
      // initialSort: [
      //   { column: 'name', dir: 'asc' },
      // ],
    }
    this.fromDt = ((): string => {
      const dt = new Date();
      dt.setDate(dt.getDate() - 1);
      return dt.toISOString().split('T')[0];
    })()
    this.toDt = undefined;
    // ((): string => {
    //   const dt = new Date();
    //   return dt.toISOString().split('T')[0];
    // })()
  }
  public keys = (obj: any): string[] => Object.keys(obj);
  public refresh(): void {
    let url = this.baseLogUrl;

    if (this.fromDt) {
      url += url?.includes('?') ? '&' : '?';
      url += `from=${this.fromDt}`;
    }
    if (this.toDt) {
      url += url?.includes('?') ? '&' : '?';
      url += `until=${this.toDt}`;
    }
    this.logEntries?.setData(url);
  }
}
