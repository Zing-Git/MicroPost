import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from  'rxjs/Observable';
import { envirotment as ENV} from '../../environments/environments';

const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class ProductoProvider {

  private urlBase = ENV.BASE_URL;
  private urlPostGetProductosDeProveedor = this.urlBase + '/proveedor/obtener_productos/'; ///proveedor/obtener_productos/?idProveedor=5b8aa0414795cc56a5539313

  constructor(public http: HttpClient) {}

  getProductosDeProveedor(idProveedor: string):Observable<any[]>{
    console.log(idProveedor);
    const url= this.urlPostGetProductosDeProveedor + '?idProveedor=' + idProveedor;
    return this.http.get<any[]>(url, cudOptions);
  }

}
