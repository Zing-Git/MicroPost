import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { envirotment as ENV } from '../../environments/environments';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { LoginProvider } from '../../providers/login/login';
import Swal from 'sweetalert2';

@IonicPage()
@Component({
  selector: 'page-salir',
  templateUrl: 'salir.html',
})
export class SalirPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private login: LoginProvider) {

    this.limpiarValoresPorDefecto();
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalirPage');
  }

  limpiarValoresPorDefecto() {
    var miUsuario = JSON.parse(ENV.APIKEY);
   //console.log(miUsuario);
    this.login.logout(miUsuario.token).subscribe(result => {
      if (result['error'] === 0) {
        Swal('Felicidades', 'Gracias por usar Bitbi', 'success');
        console.log(result);
      } else {
        Swal('error', result.message, 'warning');
      }
    })
    this.storage.set('usuarioLogin', ' ');
    //this.storage.set('yoSoy', ' ');
    ENV.NEWLOGIN = ' ';
    ENV.NOMBRE_USUARIO = ' ';
    ENV.ID_USUARIO = ' ';
    ENV.COMERCIO_ID = ' ';
    ENV.TOKEN = ' ';
    ENV.COMERCIO_LOGIN = ' ';
    
    ENV.NOMBRE_COMERCIO = ' ';
    ENV.RUBRO_COMERCIO = ' ';

    ENV.APIKEY = ' ';
    ENV.PROVEEDOR_ID = ' ';
  
    ENV.PEDIDOS = ' ';
    ENV.CARRITO = ' ';
    
  }

}

