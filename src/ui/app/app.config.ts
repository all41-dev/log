import { environment } from '../environments/environment';

export class Config {
  public static get apiBase(): string { return environment.production ? '/api' : 'http://localhost:8080/api'; }
  public static get isProduction(): boolean { return environment.production; }
}
