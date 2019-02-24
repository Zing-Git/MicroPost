import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from  'rxjs/Observable';
import { envirotment as ENV} from '../../environments/environments';
import  'rxjs/add/operator/catch';
import  'rxjs/add/operator/map';
import { Proveedor } from '../../modelo/proveedor';
import { retry } from 'rxjs/operators';

const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class ProveedorProvider {

  private urlBase = ENV.BASE_URL;
  private urlPostGetProveedores = this.urlBase + '/proveedor/listar_todos/';
  private urlPostGetProveedoresFrecuentes = this.urlBase + '/proveedor/consultar_proveedores_frecuentes/';  //nuevo si se va a utilizar
  private urlPostGetProveedoresDeComercio =  this.urlBase + '/proveedor/listar_todos/';
  private urlPostEnviarInvitacion = this.urlBase + '/invitacion/nueva/';
  private urlGetProductosPorIdProveedor = this.urlBase + '/producto/obtener_productos/'; // '/proveedor/obtener_productos/';
  private urlGetInvitacionPendiente = this.urlBase + '/invitacion/consultar_pendientes/';
  private urlPostProveedor = this.urlBase + '/proveedor/nuevo/';

  private urlGetInvitacion = this.urlBase + '/invitacion/consultar_pendientes/';
  private urlPostAceptarRechazar = this.urlBase + '/invitacion/aceptar_rechazar/';
  private urlGetPedidosProveedor = this.urlBase + '/pedido/listar_pedidos_proveedor_v2_stock/';  // '/pedido/listar_pedidos_proveedor/';  viejo
  private urlGetTodosLosAlias = this.urlBase + '/alias/listar_alias/';
  private urlGetTodosLosComercios = this.urlBase + '/proveedor/consultar_comercios_de_proveedor/';
  
  data: any;
  constructor(public http: HttpClient) {
    
  }

  //lista TODOS los proveedores 
  postGetProveedores(): Observable<any> {    
    //return this.http.post<any[]>(this.urlPostGetProveedoresDeRed, cudOptions);

    return this.http.post<any[]>(this.urlPostGetProveedores, cudOptions).pipe(
      retry(2)
    ).map(result => {
      if (result['ok']) {
        if (result['proveedores']) {
          ENV.PROVEEDORES = '';  //inicializo siempre
          ENV.PROVEEDORES = JSON.stringify(result['proveedores']);  //luego asigno y retorno true
          //localStorage.setItem('pedidosProveedor', JSON.stringify(result['pedidos_array']));
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });

  }

  postGetProveedoresDeComercio(idComercio: string):Observable<any>{
    const url= this.urlPostGetProveedoresDeComercio + '?idComercio=' + idComercio;
    //return this.http.get<any[]>(url, cudOptions);

    return this.http.get<any[]>(url, cudOptions).pipe(
      retry(2)
    ).map(result => {
      
      if (result['ok']) {
        if (result['proveedores']) {
          ENV.PROVEEDORES = '';  //inicializo siempre
          ENV.PROVEEDORES = JSON.stringify(result['proveedores']);  //luego asigno y retorno true
          
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
  }

  postGetProveedoresFrecuentes(idComercio: string):Observable<any>{
    const comercio = Object.assign({}, idComercio);
    //const url= this.urlPostGetProveedoresFrecuentes + '?idComercio=' + idComercio;
   
    return this.http.post<any[]>(this.urlPostGetProveedoresFrecuentes, comercio,  cudOptions).pipe(
      retry(2)
    ).map(result => {
      console.log(result);
      if (result['ok']===1) {
        if (result['proveedores']) {
          ENV.PROVEEDORES = '';  //inicializo siempre
          ENV.PROVEEDORES = JSON.stringify(result['proveedores']);  //luego asigno y retorno true
          
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
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


  getEstadoProveedor(idProveedor: string): Observable<any[]>{
    const url = this.urlGetInvitacionPendiente + '?idProveedor=' + idProveedor; 
    return this.http.get<any>(url, cudOptions);
  }

  postProveedor(proveedor: Proveedor): Observable<any> {
    const newSession = Object.assign({}, proveedor);
    return this.http.post<any[]>(this.urlPostProveedor, newSession, cudOptions);
  }

  getInvitaciones(idProveedor: string): Observable<any[]>{
    let url= this.urlGetInvitacion + '?proveedor=' + idProveedor;
    
    return this.http.get<any[]>(url, cudOptions);
  }

  postAceptarRechazar(idInvitacion: any, aceptado: boolean, alias: string): Observable<any>{
    console.log(alias,idInvitacion,aceptado);
    const parametros = {
      idInvitacion: idInvitacion,
      aceptada: aceptado,
      alias: alias
    }
    
    return this.http.post<any>(this.urlPostAceptarRechazar, parametros,cudOptions);
  }

  getPedidosProveedor(idProveedor: string): Observable<any> {  
    
    let url= this.urlGetPedidosProveedor + '?idProveedor=' + idProveedor;
    
    //return this.http.get<any[]>(url, cudOptions);

    return this.http.get<any[]>(url, cudOptions).pipe(
      retry(2)
    ).map(result => {
      console.log(result);
      if (result['ok']) {
        if (result['pedidos_array']) {  // ENV.PEDIDOS = JSON.stringify(result['pedidos_array']);
          ENV.PEDIDOS = '';  //inicializo siempre
          ENV.PEDIDOS = JSON.stringify(result['pedidos_array']);  //luego asigno y retorno true
          //localStorage.setItem('pedidosProveedor', JSON.stringify(result['pedidos_array']));
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
  }

  getTodosLosAlias(idProveedor: string): Observable<any[]> {  
    
    let url= this.urlGetTodosLosAlias + '?idProveedor=' + idProveedor; //?idProveedor
    
    return this.http.get<any[]>(url, cudOptions);
  }

  getTodosLosComercios(idProveedor: string): Observable<any[]>{
    let url= this.urlGetTodosLosComercios + '?idProveedor=' + idProveedor; //?idProveedor
    
    return this.http.get<any[]>(url, cudOptions);
  }

}
