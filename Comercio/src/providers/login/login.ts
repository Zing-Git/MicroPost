import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../../modelo/login';
import { envirotment as ENV} from '../../environments/environments';

import { HTTP, HTTPResponse } from '@ionic-native/http';
//import { RequestOptions } from '@angular/http';

//declare module 'google-maps';

var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
    headers.append('Content-Type', 'application/json');

const cudOptions = {
  headers: headers,
};


    
const cudOptionsXWWForm = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})
};

@Injectable()
export class LoginProvider {
  
  private urlBase = ENV.BASE_URL;
  private urlPostGetLogin = this.urlBase + '/comercio/ingresar/';

  constructor(public http: HttpClient) {
  }

  getLogin(loginModel: LoginModel): Observable<any[]> { //{Promise<HTTPResponse>
   
    const parametros= {
      nombreUsuario: loginModel.nombreUsuario,
      clave: loginModel.clave
    };
    
    return this.http.post<any[]>(this.urlPostGetLogin, parametros, cudOptions);
    
  }
}
