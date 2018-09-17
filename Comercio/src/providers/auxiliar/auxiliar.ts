import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envirotment as ENV} from '../../environments/environments';

const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const cudOptionsXWWForm = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})
};
const cudOptionsHtml = {
  headers: new HttpHeaders({ 'Content-Type': 'text/html; charset=utf-8'})
};

@Injectable()
export class AuxiliarProvider {

  private urlBase = ENV.BASE_URL;
  private urlPostGetCombos = this.urlBase + '/conf/combos/';

  constructor(public http: HttpClient) {
   
  }

  // POST: Obtiene todos los combos a cargar en pantalla de creditos
  postGetCombos(): Observable<any[]> {
    return this.http.post<any[]>(this.urlPostGetCombos, cudOptions);
  }

}
