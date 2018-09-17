import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comercio } from '../../modelo/comercio';
import { Observable } from  'rxjs/Observable';
import { envirotment as ENV} from '../../environments/environments';
import  'rxjs/add/operator/catch';
import  'rxjs/add/operator/map';

const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class ComercioProvider {
  private urlBase = ENV.BASE_URL;
  private urlPostComercio = this.urlBase + '/comercio/nuevo/';
  
  constructor(public http: HttpClient) {}

  postComercio(comercio: Comercio): Observable<any[]> {
    const newSession = Object.assign({}, comercio);
    return this.http.post<any[]>(this.urlPostComercio, newSession, cudOptions);
  }

}
