import { Component } from '@angular/core';
import { NavController, Refresher, AlertController } from 'ionic-angular';
import Swal from 'sweetalert2';

import { LoginModel } from '../../modelo/login';
import { LoginProvider } from '../../providers/login/login';
import { AltaClientePage } from '../alta-cliente/alta-cliente';
import { ConfiguracionInicialPage } from '../configuracion-inicial/configuracion-inicial';
import { Storage } from '@ionic/storage';
import { envirotment as ENV} from '../../environments/environments';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  newLogin: LoginModel;
  usuarioLogin: any;   //get token and _id
  datosComercio: any[];
  public readyToLogin: boolean;
  //private secureStorage: SecureStorage;

  constructor(private navCtrl: NavController,
    private login: LoginProvider, 
    private alertCtrl: AlertController,
    private storage: Storage) {
    this.newLogin = new LoginModel();

  }

  getLogin() {

    if ((typeof this.newLogin.nombreUsuario != 'undefined' && this.newLogin.nombreUsuario) && (typeof this.newLogin.clave != 'undefined' && this.newLogin.clave)) {

      this.login.getLogin(this.newLogin).subscribe(result => {
        this.datosComercio = result['comercioDB'];
        this.usuarioLogin = result['usuario'];
        
        if (typeof this.usuarioLogin === 'undefined') {          
          Swal('Atención', 'Ocurrio un problema, vuelva a ingresar las credenciales', 'error')
        } else {
          
          this.almacenarValoresImportantes();         

          this.navCtrl.setRoot(ConfiguracionInicialPage, { data: this.datosComercio }, {
            animate: true
          });
         /* this.navCtrl.setRoot(MenuPage);*/
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

  almacenarValoresImportantes(){
    this.storage.set('id', this.usuarioLogin._id);
    this.storage.set('token', this.usuarioLogin.token);
    ENV.NOMBRE_USUARIO = this.newLogin.nombreUsuario;
    
    /*this.storage.get('token').then((val) => {
      console.log('Your id is', val);
    });*/
  }
}
