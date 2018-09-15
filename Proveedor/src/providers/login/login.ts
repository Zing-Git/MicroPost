import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../../modelo/login';

const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class LoginProvider {

  public urlBase = 'https://zpos.herokuapp.com';
  public urlPostGetLogin = this.urlBase + '/comercio/ingresar/';

  constructor(public http: HttpClient) {
   
  }

  getLogin(loginModel: LoginModel): Observable<any[]>{
<<<<<<< HEAD
=======
    
>>>>>>> 9745dd4bdf334a3b6758c6d24ea8f3687846c43f
    const parametros= {
      nombreUsuario: loginModel.nombreUsuario,
      clave: loginModel.clave
    };
    
    return this.http.post<any[]>(this.urlPostGetLogin, parametros, cudOptions);
  }
}
