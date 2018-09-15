import { Component } from '@angular/core';
import { NavController, Refresher, AlertController } from 'ionic-angular';
import Swal from 'sweetalert2';

import { LoginModel } from '../../modelo/login';
import { LoginProvider } from '../../providers/login/login';
import { AltaClientePage } from '../alta-cliente/alta-cliente';
import { ListaProveedoresPage } from '../lista-proveedores/lista-proveedores';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  newLogin: LoginModel;
  usuarioLogin: {
    _id: string,
    token: string
  };
  datosComercio: any[];
  public readyToLogin: boolean;
  //private secureStorage: SecureStorage;

  constructor(private navCtrl: NavController,
    private login: LoginProvider, private alertCtrl: AlertController) {
    this.newLogin = new LoginModel();

  }

  getLogin() {

    if ((typeof this.newLogin.nombreUsuario != 'undefined' && this.newLogin.nombreUsuario) && (typeof this.newLogin.clave != 'undefined' && this.newLogin.clave)) {

      this.login.getLogin(this.newLogin).subscribe(result => {
        this.datosComercio = result['comercioDB'];
        this.usuarioLogin = result['usuario'];
        
        if (typeof this.usuarioLogin === 'undefined') {
          //this.presentAlert(); 
          Swal('Atención', 'Ocurrio un problema, vuelva a ingresar las credenciales', 'error')
        } else {
          //console.log(this.usuarioLogin.token);
          this.navCtrl.setRoot(ListaProveedoresPage, { data: this.datosComercio }, {
            animate: true
          });
        }

      }, err => {
        Swal('Atención', 'Ocurrio un problema inesperado', 'error')
      });
    }
  }

  goCreateCliente() {
    //console.log('aqui');
    this.navCtrl.push(AltaClientePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doRefresh(refresher: Refresher) {
    setTimeout(() => {
      console.log("Termino el refhresh");
      this.newLogin = new LoginModel();
      refresher.complete();
    }, 1500);
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Atencion',
      subTitle: 'Ingreso mal las credenciales',
      buttons: [{
        text: 'Ok',
        handler: () => {
          location.reload();
        }
      }]
    });
    alert.present();
  }
}
