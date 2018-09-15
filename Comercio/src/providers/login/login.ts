import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../../modelo/login';

const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const cudOptionsXWWForm = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})
};

@Injectable()
export class LoginProvider {

  public urlBase = 'https://zpos.herokuapp.com';
  public urlPostGetLogin = this.urlBase + '/comercio/ingresar/';

  constructor(public http: HttpClient) {
    console.log('Hello LoginProvider Provider');
  }

  getLogin(loginModel: LoginModel): Observable<any[]>{
    
    const parametros= {
      nombreUsuario: loginModel.nombreUsuario,
      clave: loginModel.clave
    };
    
    return this.http.post<any[]>(this.urlPostGetLogin, parametros, cudOptions);
  }
}
