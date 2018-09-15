import { Component } from '@angular/core';
import { NavController, Refresher, AlertController } from 'ionic-angular';
import Swal from 'sweetalert2';

import { LoginModel } from '../../modelo/login';
<<<<<<< HEAD
import { AltaProveedorPage } from '../alta-proveedor/alta-proveedor';
import { LoginProvider } from '../../providers/login/login';
import Swal from 'sweetalert2';
=======
import { LoginProvider } from '../../providers/login/login';
import { AltaClientePage } from '../alta-cliente/alta-cliente';
import { ListaProveedoresPage } from '../lista-proveedores/lista-proveedores';
>>>>>>> 9745dd4bdf334a3b6758c6d24ea8f3687846c43f

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
<<<<<<< HEAD
  
  constructor(private navCtrl: NavController,
    private login : LoginProvider        ) {
=======
  datosComercio: any[];
  public readyToLogin: boolean;
  //private secureStorage: SecureStorage;

  constructor(private navCtrl: NavController,
    private login: LoginProvider, private alertCtrl: AlertController) {
>>>>>>> 9745dd4bdf334a3b6758c6d24ea8f3687846c43f
    this.newLogin = new LoginModel();

  }

  getLogin() {

    if ((typeof this.newLogin.nombreUsuario != 'undefined' && this.newLogin.nombreUsuario) && (typeof this.newLogin.clave != 'undefined' && this.newLogin.clave)) {

<<<<<<< HEAD
    if((typeof this.newLogin.nombreUsuario != 'undefined' && this.newLogin.nombreUsuario)  &&(typeof this.newLogin.clave != 'undefined' && this.newLogin.clave)){
      
=======
>>>>>>> 9745dd4bdf334a3b6758c6d24ea8f3687846c43f
      this.login.getLogin(this.newLogin).subscribe(result => {
        this.datosComercio = result['comercioDB'];
        this.usuarioLogin = result['usuario'];
<<<<<<< HEAD
               
=======
        
>>>>>>> 9745dd4bdf334a3b6758c6d24ea8f3687846c43f
        if (typeof this.usuarioLogin === 'undefined') {
          //this.presentAlert(); 
          Swal('Atención', 'Ocurrio un problema, vuelva a ingresar las credenciales', 'error')
        } else {
<<<<<<< HEAD
          console.log(this.usuarioLogin.token);
          this.navCtrl.setRoot(HomePage, {
            animate: true
          });
        }
        //this.navCtrl.push(HomePage);
=======
          //console.log(this.usuarioLogin.token);
          this.navCtrl.setRoot(ListaProveedoresPage, { data: this.datosComercio }, {
            animate: true
          });
        }

>>>>>>> 9745dd4bdf334a3b6758c6d24ea8f3687846c43f
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
