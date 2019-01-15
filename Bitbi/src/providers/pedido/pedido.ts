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
    
  }

  postAceptarPedido(idPedido: string, alias: string): Observable<any> {
    //const newSession = Object.assign({}, idPedido);
    const parametros = {
      idPedido: idPedido,
      alias: alias
    }
    return this.http.post<any>(this.urlAceptarPedido, parametros, cudOptions);
  }

  postRechazarPedido(idPedido: string, mensaje: string, alias: string): Observable<any> {
    //const newSession = Object.assign({}, idPedido);
    const parametros = {
      idPedido: idPedido,
      comentario: mensaje,
      alias: alias
    }
    return this.http.post<any>(this.urlRechazarPedido, parametros, cudOptions);
  }

}
