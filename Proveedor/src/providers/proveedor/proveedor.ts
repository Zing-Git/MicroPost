import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from  'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/operator/map';
import { envirotment as ENV } from '../../environments/environment';
import { Proveedor } from '../../modelo/proveedor';
import 'rxjs/add/operator/map';


const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};


@Injectable()
export class ProveedorProvider {

  private urlBase = ENV.BASE_URL;
  private urlGetPedidosProveedor = this.urlBase + '/pedido/listar_pedidos_proveedor/';


  //private urlPostGetProveedoresDeRed = this.urlBase + '/proveedor/listar_todos/';
  private urlPostGetProveedores =  this.urlBase + '/proveedor/listar_todos/';
  //private urlPostEnviarInvitacion = this.urlBase + '/invitacion/nueva/';
  private urlGetProductosPorIdProveedor = this.urlBase + '/proveedor/obtener_productos/';
  private urlPostProveedor = this.urlBase + '/proveedor/nuevo/';
  private urlGetInvitacion = this.urlBase + '/invitacion/consultar_pendientes/';

  data: any;
  constructor(public http: HttpClient) {
    
  }

  postProveedor(proveedor: Proveedor): Observable<any[]> {
    const newSession = Object.assign({}, proveedor);
    return this.http.post<any[]>(this.urlPostProveedor, newSession, cudOptions);
  }

  getPedidosProveedor(idProveedor: string): Observable<any[]> {  
    
    let url= this.urlGetPedidosProveedor + '?idProveedor=' + idProveedor;
    
    return this.http.get<any[]>(url, cudOptions);
  }

  postGetProveedores():Observable<any[]>{
    return this.http.get<any[]>(this.urlPostGetProveedores, cudOptions);
  }

  getInvitaciones(idProveedor: string): Observable<any[]>{
    let url= this.urlGetInvitacion + '?proveedor=' + idProveedor;
    
    return this.http.get<any[]>(url, cudOptions);
  }

  /*postEnviarInvitacion(peticion: any): Observable<any>{
    const invitacion ={
      comercio: peticion.comercio,
      proveedor: peticion.proveedor,
      texto: peticion.texto
    }
    
    return this.http.post<any>(this.urlPostEnviarInvitacion, invitacion, cudOptions);
  }*/

  postGetProductosPorIdProveedor(idProveedor: string): Observable<any[]>{
    
    const url = this.urlGetProductosPorIdProveedor + '?idProveedor=' + idProveedor; 
    return this.http.get<any>(url, cudOptions);
  }

  load(idProveedor: string): any {
    let url= this.urlGetPedidosProveedor + '?idProveedor=' + idProveedor;
    
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }
  
    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get<any[]>(url, cudOptions)
      .map(rsp => rsp)
        .subscribe(element => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = element;
          resolve(this.data);
        });
    });
  }

}
