import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envirotment as ENV } from '../../environments/environments';
import { LoadingController } from 'ionic-angular';
import { DecimalPipe } from '@angular/common';
import { Storage } from '@ionic/storage';

const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class AuxiliarProvider {

  private urlBase = ENV.BASE_URL;
  private urlPostGetCombos = this.urlBase + '/conf/combos/';
  private urlGetPublcidades = this.urlBase + '/publicidad/obtener_publicidad/';
  private urlVersion = this.urlBase + '/conf/version/';
  data: any;

  constructor(private storage: Storage,public http: HttpClient, private loadingCtrl: LoadingController, private decimalPipe: DecimalPipe) {

  }

  // POST: Obtiene todos los combos a cargar en pantalla de creditos
  postGetCombos(): Observable<any[]> {
    return this.http.post<any[]>(this.urlPostGetCombos, cudOptions);
  }

  presentLoading() {
    this.storage.get('token').then((val) => {
      
    });
  }

  twoDecimals(number) {
    return this.decimalPipe.transform(number, '1.2-2');
  }

  crearArray(arreglo: string[]): any[] {

    let clon: any[] = JSON.parse(JSON.stringify(arreglo));
    let nuevoArreglo = Array.from(new Set(clon.map((item: any) => item)))

    return nuevoArreglo;
  }

  getPublcidades():Observable<any[]>{
    return this.http.post<any>(this.urlGetPublcidades,cudOptions);
  }

  load(): any {
    
    
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }
  
    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.post<any[]>(this.urlGetPublcidades, cudOptions)
      .map(rsp => rsp)
        .subscribe(element => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = element;
          resolve(this.data);
        });
    });
  }

  getNombreComercio(){
    return ENV.NOMBRE_COMERCIO;
  }
  getRubroComercio(){
    return ENV.RUBRO_COMERCIO;
  }

  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}

getVersionFromServer(): Observable<any[]>{
  return this.http.get<any>(this.urlVersion,cudOptions);
}
  
}
