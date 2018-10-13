import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envirotment as ENV } from '../../environments/environments';
import { LoadingController } from 'ionic-angular';
import { DecimalPipe } from '@angular/common'

const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class AuxiliarProvider {

  private urlBase = ENV.BASE_URL;
  private urlPostGetCombos = this.urlBase + '/conf/combos/';
  private urlGetPublcidades = this.urlBase + '/publicidad/obtener_publicidad/';
  data: any;

  constructor(public http: HttpClient, private loadingCtrl: LoadingController, private decimalPipe: DecimalPipe) {

  }

  // POST: Obtiene todos los combos a cargar en pantalla de creditos
  postGetCombos(): Observable<any[]> {
    return this.http.post<any[]>(this.urlPostGetCombos, cudOptions);
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Por favor Espere unos segundos...",
      duration: 4000
    });
    loader.present();
    loader.dismiss();
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
  
}
