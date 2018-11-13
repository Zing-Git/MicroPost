import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envirotment as ENV} from '../../environments/environment';
import { DecimalPipe } from '@angular/common';

const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),

};

const cudMultiPart ={
  headers: new HttpHeaders({'Content-Type':'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'})
};


@Injectable()
export class AuxiliarProvider {

  private urlBase = ENV.BASE_URL;
  private urlPostGetCombos = this.urlBase + '/conf/combos/';
  private urlPostPublicidad  = this.urlBase + '/publicidad/subir_foto/';
  private urlVersion = this.urlBase + '/conf/version/';

  constructor(public http: HttpClient, private decimalPipe: DecimalPipe) {
   
  }

  // POST: Obtiene todos los combos a cargar en pantalla de creditos
  postGetCombos(): Observable<any[]> {
    return this.http.post<any[]>(this.urlPostGetCombos, cudOptions);
  }

  twoDecimals(number) {
    return this.decimalPipe.transform(number, '1.2-2');
  }

  crearArray(arreglo: string[]): any[] {

    let clon: any[] = JSON.parse(JSON.stringify(arreglo));
    let nuevoArreglo = Array.from(new Set(clon.map((item: any) => item)))

    return nuevoArreglo;
  }

  postCrearPublicidad(imagen: any, cuerpo: string, proveedor: string, fechaInicio: string, fechaFin: string, titulo: string): Observable<any>{
    
    
    const parametros = {
      imagen: imagen,
      extension: "jpg",
      cuerpo: cuerpo,
      proveedor: proveedor,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      titulo: titulo
    }
    return this.http.post<any>(this.urlPostPublicidad, parametros, cudOptions);
  }

  getRazonSocial(){
    return ENV.NOMBRE_PROVEEDOR;
  }
  getRubroProveedor(){
    return ENV.RUBRO_PROVEEDOR;
  }

  getVersionFromServer(): Observable<any[]>{
    return this.http.get<any>(this.urlVersion,cudOptions);
  }

}
