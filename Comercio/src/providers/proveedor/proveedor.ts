import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from  'rxjs/Observable';
import { envirotment as ENV} from '../../environments/environments';
import  'rxjs/add/operator/catch';
import  'rxjs/add/operator/map';

const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class ProveedorProvider {

  private urlBase = ENV.BASE_URL;
  private urlPostGetProveedoresDeRed = this.urlBase + '/proveedor/listar_todos/';
  private urlPostGetProveedoresDeComercio =  this.urlBase + '/proveedor/listar_todos/';
  private urlPostEnviarInvitacion = this.urlBase + '/invitacion/nueva/';
  private urlGetProductosPorIdProveedor = this.urlBase + '/proveedor/obtener_productos/';

  constructor(public http: HttpClient) {
    
  }

  //lista TODOS los proveedores 
  postGetProveedorDeRed(): Observable<any[]> {    
    return this.http.post<any[]>(this.urlPostGetProveedoresDeRed, cudOptions);
  }

  postGetProveedoresDeComercio(idComercio: string):Observable<any[]>{
    const url= this.urlPostGetProveedoresDeComercio + '?idComercio=' + idComercio;
    return this.http.get<any[]>(url, cudOptions);
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
