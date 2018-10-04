import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envirotment as ENV} from '../../environments/environments';
import { LoadingController } from 'ionic-angular';
import { DecimalPipe } from '@angular/common'

const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class AuxiliarProvider {

  private urlBase = ENV.BASE_URL;
  private urlPostGetCombos = this.urlBase + '/conf/combos/';

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
  }

  twoDecimals(number) {
    return this.decimalPipe.transform(number, '1.2-2');
}
}
