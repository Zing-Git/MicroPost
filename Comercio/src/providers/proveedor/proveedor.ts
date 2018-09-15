import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from  'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/operator/map';

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
export class ProveedorProvider {

  private urlBase = 'https://zpos.herokuapp.com';
  private urlPostGetProveedoresDeRed = this.urlBase + '/proveedor/listar_todos/';
  private urlPostGetProveedores =  this.urlBase + '/proveedor/listar_todos/';
  private urlPostEnviarInvitacion = this.urlBase + '/invitacion/nueva/';
  private urlGetProductosPorIdProveedor = this.urlBase + '/proveedor/obtener_productos/';

  constructor(public http: HttpClient) {
    
  }

  postGetProveedorDeRed(): Observable<any[]> {    
    return this.http.post<any[]>(this.urlPostGetProveedoresDeRed, cudOptions);
  }

  postGetProveedores():Observable<any[]>{
    return this.http.get<any[]>(this.urlPostGetProveedores, cudOptions);
  }

  postEnviarInvitacion(peticion: any): Observable<any>{
    const invitacion ={
      comercio: peticion.comercio,
      proveedor: peticion.proveedor,
      texto: peticion.texto
    }
    
    return this.http.post<any>(this.urlPostEnviarInvitacion, invitacion, cudOptions);
  }

  postGetProductosPorIdProveedor(idProveedor: string): Observable<any[]>{
    
    const url = this.urlGetProductosPorIdProveedor + '?idProveedor=' + idProveedor; 
    return this.http.get<any>(url, cudOptions);
  }

}
