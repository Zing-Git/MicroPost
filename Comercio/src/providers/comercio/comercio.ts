import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comercio } from '../../modelo/comercio';
import { Observable } from  'rxjs/Observable';
import { envirotment as ENV} from '../../environments/environments';
import  'rxjs/add/operator/catch';
import  'rxjs/add/operator/map';
import { observableToBeFn } from 'rxjs/testing/TestScheduler';
import { Pedido } from '../../modelo/pedido';

const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class ComercioProvider {
  private urlBase = ENV.BASE_URL;
  private urlPostComercio = this.urlBase + '/comercio/nuevo/';
  private urlConsultaPedidoComercio = this.urlBase + '/pedido/listar_pedidos_comercio/';
  private urlPostPedidoProveedor = this.urlBase + '/pedido/nuevo/';
  
  constructor(public http: HttpClient) {}

  postComercio(comercio: Comercio): Observable<any[]> {
    const newSession = Object.assign({}, comercio);
    return this.http.post<any[]>(this.urlPostComercio, newSession, cudOptions);
  }

  getPedidoAProveedor(idComercio: string): Observable<any[]> {
    const url = this.urlConsultaPedidoComercio + '?idComercio=' + idComercio; 
    return this.http.get<any[]>(url, cudOptions);
  }

  postPedidoProveedor(pedido: Pedido): Observable<any[]>{
    const newSession = Object.assign({}, pedido);
    return this.http.post<any[]>(this.urlPostPedidoProveedor, newSession, cudOptions);
  }
}
