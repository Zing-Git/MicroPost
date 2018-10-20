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
  private urlGetInvitacionPendiente = this.urlBase + '/invitacion/consultar_pendientes/';
  data: any;
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

  postEnviarInvitacion(proveedor: string, comercio: string, texto: string): Observable<any>{
    const invitacion ={
      comercio: comercio,
      proveedor: proveedor,
      texto: texto
    }
    console.log(invitacion);
    return this.http.post<any>(this.urlPostEnviarInvitacion, invitacion, cudOptions);
  }

  postGetProductosPorIdProveedor(idProveedor: string): Observable<any[]>{
    
    const url = this.urlGetProductosPorIdProveedor + '?idProveedor=' + idProveedor; 
    return this.http.get<any>(url, cudOptions);
  }

  load(idProveedor: string): any {
    let url= this.postGetProductosPorIdProveedor + '?idProveedor=' + idProveedor;
    
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }
  
    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get<any>(url, cudOptions)
      .map(rsp => rsp)
        .subscribe(element => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = element;
          resolve(this.data);
        });
    });
  }

  getEstadoProveedor(idProveedor: string): Observable<any[]>{
    const url = this.urlGetInvitacionPendiente + '?idProveedor=' + idProveedor; 
    return this.http.get<any>(url, cudOptions);
  }

}
