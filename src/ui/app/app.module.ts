import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes} from '@angular/router';
import { ComponentsUiModule, Config } from '@all41-dev/ui-components';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LayoutComponent } from './layout/layout.component';

const appRoutes: Routes = [
  { path: '', component: LayoutComponent,
    children: [
      { path: '', component: MainComponent },
      // { path: 'config', component: ConfigComponent },
      // { path: 'key-map', component: KeyMapComponent },
      // { path: 'module/:id', component: ModuleComponent },
      // { path: 'exchange/:id', component: ExchangeComponent },
      // { path: 'entity-mapping/:id', component: EntityMappingComponent },
    ]}
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    MainComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ComponentsUiModule,
    OAuthModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  providers: [Config],
})
export class AppModule { }
