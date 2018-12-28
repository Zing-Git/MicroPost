import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from  'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/operator/map';
import { envirotment as ENV } from '../../environments/environments';
//import { Proveedor } from '../../modelo/proveedor';
import 'rxjs/add/operator/map';

const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class PedidoProvider {

  private urlBase = ENV.BASE_URL;
  private urlAceptarPedido = this.urlBase + '/pedido/aceptar/';
  private urlRechazarPedido = this.urlBase + '/pedido/rechazar/';
  data: any;
  constructor(public http: HttpClient) {
    console.log('Hello PedidoProvider Provider');
  }

  postAceptarPedido(idPedido: string): Observable<any> {
    //const newSession = Object.assign({}, idPedido);
    const parametros = {
      idPedido: idPedido
    }
    return this.http.post<any>(this.urlAceptarPedido, parametros, cudOptions);
  }

  postRechazarPedido(idPedido: string, mensaje: string): Observable<any> {
    //const newSession = Object.assign({}, idPedido);
    const parametros = {
      idPedido: idPedido,
      comentario: mensaje
    }
    return this.http.post<any>(this.urlRechazarPedido, parametros, cudOptions);
  }

  /*load(idPedido: string): any {
    const newSession = Object.assign({}, idPedido);
    
    
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }
  
    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.post<any[]>(this.urlAceptarPedido, newSession, cudOptions)
      .map(rsp => rsp)
        .subscribe(element => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = element;
          resolve(this.data);
        });
    });
  }*/
}
