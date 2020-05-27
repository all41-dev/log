import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { EditType, RecordListLayout, SelectionType, OptionsEditableColumn} from '@all41/ui-components';
import {OAuthService} from 'angular-oauth2-oidc';
import { Config } from '../app.config';
import { LogEntry } from '../../../models/log-entry';

@Component({
  selector: 'app-main',
  styleUrls: ['./main.component.css'],
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  public title = 'logs manager';
  // protected httpClient: HttpClient;

  public selectedLogEntry: LogEntry[] = [];

  public logLayout: RecordListLayout<LogEntry & any> = {
    title: 'log entries',
    height: 400,
    primaryKeyProperty: 'id',
    chunkSize: 50,
    selectionType: SelectionType.Single,
    entityUrl: '/api/log-entry?include=meta',
    initRecord: (recs: LogEntry[]) => {
      recs.forEach((rec) => {
        if (!rec.metas) return;

        rec.metas.forEach((meta) => {
          (rec as any)[`meta.${meta.key}`] = meta.value;
        });
      })
      return recs;
    },
    /** 
     * host, app, user, time, message, stack (error)
     */
    columns: [{
      label: 'host',
      recordProperty: 'meta.hostname',//hostname, customer, application
      isEditable: false,
      width: '150px',
      isFilterVisible: true,
    },{
      label: 'app',
      recordProperty: 'meta.application',
      isEditable: false,
      width: '150px',
      isFilterVisible: true,
    },{
      label: 'customer',
      recordProperty: 'meta.customer',
      isEditable: false,
      width: '150px',
      isFilterVisible: true,
    },{
      label: 'level',
      recordProperty: 'levelCode',
      isEditable: false,
      width: '100px',
      isFilterVisible: true,
    },{
      label: 'time',
      recordProperty: 'createdAt',
      isEditable: false,
      width: '200px',
      isFilterVisible: true,
    },{
      label: 'message',
      recordProperty: 'message',
      isEditable: false,
      width: '600px',
      isFilterVisible: true,
    // },{
    //   label: 'stack',
    //   recordProperty: 'callStack',
    //   isEditable: false,
    //   width: '300px',
    }]
  }

  public constructor(protected httpClient: HttpClient) {}

  public ngOnInit(): void {
    // this.modulesLayout = {
    //   columns: [{
    //     editType: EditType.Text,
    //     isEditable: true,
    //     label: 'nom de l\'instance',
    //     recordProperty: 'instanceName',
    //     width: '200px',
    //   }, {
    //     editType: EditType.Dropdown,
    //     isEditable: true,
    //     label: 'code',
    //     recordProperty: 'moduleCode',
    //     width: '150px',
    //   }, {
    //     editType: EditType.Dropdown,
    //     isEditable: true,
    //     label: 'actif',
    //     options: [
    //       { label: 'oui', value: true },
    //       { label: 'non', value: false },
    //     ],
    //     recordProperty: 'isEnabled',
    //     width: '50px',
    //   }, {
    //     editType: EditType.Text,
    //     isEditable: true,
    //     label: 'start command',
    //     recordProperty: 'startCommand', // selection anchor
    //     width: '150px',
    //   }, {
    //     isEditable: false,
    //     label: '',
    //     html: (_parent, rec: Module): string => `<a href="/admin/module/${rec.moduleCode}">open</a>`,
    //     recordProperty: undefined,
    //     width: '150px',
    //   }],
    //   entityUrl: `${Config.apiBase}/modules`,
    //   height: 150,
    //   isAddEnabled: true,
    //   isDeleteEnabled: true,
    //   primaryKeyProperty: 'id',
    //   selectionType: SelectionType.None,
    //   title: 'modules',
    // };
    // this.exchangesLayout = {
    //   columns: [{
    //     editType: EditType.Dropdown,
    //     isEditable: true,
    //     label: 'code',
    //     recordProperty: 'exchangeCode',
    //     width: '200px',
    //   }, {
    //     editType: EditType.Text,
    //     isEditable: true,
    //     label: 'exchange name',
    //     recordProperty: 'exchangeName',
    //     width: '250px',
    //   }],
    //   entityUrl: `${Config.apiBase}/exchanges`,
    //   height: 150,
    //   isAddEnabled: true,
    //   isDeleteEnabled: true,
    //   primaryKeyProperty: 'exchangeCode',
    //   selectionType: SelectionType.None,
    //   title: 'canaux',
    // };

    // this.httpClient.get(`${Config.apiBase}/modules/available`).toPromise().then((modules): void => {
    //   (this.modulesLayout.columns.find((c): boolean => c.recordProperty === 'moduleCode') as OptionsEditableColumn<Module>).options =
    //     (modules as []).map((m): any => ({label: m, value: m}))
    // })
    // this.httpClient.get(`${Config.apiBase}/exchanges/available`).toPromise().then((exchanges): void => {
    //   (this.exchangesLayout.columns.find((c): boolean => c.recordProperty === 'exchangeCode') as OptionsEditableColumn<Exchange>).options =
    //     (exchanges as []).map((m): any => ({label: m, value: m}))
    // })
  }
  public keys = (obj: any): string[] => Object.keys(obj);
}
