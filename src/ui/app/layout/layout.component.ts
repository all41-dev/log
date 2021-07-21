import { Component, ViewChild } from '@angular/core';
import { NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import { AuthenticationBase, Config } from '@all41-dev/ui-components';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent extends AuthenticationBase {
  title = 'users microservice';
  @ViewChild('menu') private menu: any;
  @ViewChild('content') private content: any;

  public get customMenu(): { label: string; uri: string }[] {
    const cm: { label: string; uri: string }[] = this.config.get('customMenu') || [];
    return cm;
  }

  public get secured(): boolean {
    return this.config.get('authType') !== undefined;
  }
  constructor(titleService: Title, public router: Router, oauthService: OAuthService, config: Config) {
    super(oauthService, config)
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(router.routerState, router.routerState.root).join('-');
        // console.log('title', title);
        titleService.setTitle(title);
        this.title = title;
      }
    });
  }

  getTitle(state: any, parent: any): any[] {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  afterAuthInit(): void {/**/}

  toggleMenu = (): void => {
    // console.debug(this.menu);
    const visible = this.menu.nativeElement.style.display;
    if (visible === 'none') {
      this.menu.nativeElement.style.display = 'block';
      this.content.nativeElement.style.marginLeft = '250px';
    } else {
      this.menu.nativeElement.style.display = 'none';
      this.content.nativeElement.style.marginLeft = '0';
    }
  }
}
