import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../../modelo/login';
import { envirotment as ENV} from '../../environments/environment';

const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class LoginProvider {

  public urlBase = ENV.BASE_URL;
  public urlPostGetLogin = this.urlBase + '/proveedor/ingresar/';

  constructor(public http: HttpClient) {
   
  }

  getLogin(loginModel: LoginModel): Observable<any[]>{
    
    const parametros= {
      nombreUsuario: loginModel.nombreUsuario,
      clave: loginModel.clave
    };
    
    return this.http.post<any[]>(this.urlPostGetLogin, parametros, cudOptions);
  }
}
