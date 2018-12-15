import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../../modelo/login';
import { envirotment as ENV } from '../../environments/environments';
import { AlertController } from 'ionic-angular';

//import { RequestOptions } from '@angular/http';

//declare module 'google-maps';

var headers = new HttpHeaders();
headers.append('Access-Control-Allow-Origin', '*');
headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
headers.append('Accept', 'application/json');
headers.append('content-type', 'application/json');
headers.append('Content-Type', 'application/json');

const cudOptions = {
  headers: headers,
};

const cudOptionsViejo = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class LoginProvider {

  private urlBase = ENV.BASE_URL;
  private urlPostGetComercioLogin = this.urlBase + '/comercio/ingresar/';
  public urlPostGetProveedorLogin = this.urlBase + '/proveedor/ingresar/';
  private urlLogout = this.urlBase + '/usuario/salir/';

  constructor(public http: HttpClient, public alertCtrl: AlertController) {
  }

  getLoginComercio(loginModel: LoginModel): Observable<any[]> { //{Promise<HTTPResponse>

    const parametros = {
      nombreUsuario: loginModel.nombreUsuario,
      clave: loginModel.clave,
      idPush: ENV.IDPUSH.toString()
    };

    return this.http.post<any[]>(this.urlPostGetComercioLogin, parametros, cudOptions);

  }

  getLoginProveedor(loginModel: LoginModel): Observable<any[]> { //{Promise<HTTPResponse>

    const parametros = {
      nombreUsuario: loginModel.nombreUsuario,
      clave: loginModel.clave,
      idPush: ENV.IDPUSH.toString()
    };

    const newSession = Object.assign({}, parametros);

    /*let alert = this.alertCtrl.create({
      title: 'the onesignal ids object',
      message: ENV.IDPUSH.toString(),
      buttons: [{
        text: 'Ok',
        role: 'ok'
      }]
    });
    alert.present();*/
    return this.http.post<any[]>(this.urlPostGetProveedorLogin, newSession, cudOptions);

  }

  logout(token: any): Observable<any> {
    const parametros = {
      token: token
    };

    return this.http.post<any[]>(this.urlLogout, parametros, cudOptionsViejo);
  }
}
