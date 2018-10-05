import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envirotment as ENV} from '../../environments/environment';
import { DecimalPipe } from '@angular/common';

const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};


@Injectable()
export class AuxiliarProvider {

  private urlBase = ENV.BASE_URL;
  public urlPostGetCombos = this.urlBase + '/conf/combos/';

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

}
