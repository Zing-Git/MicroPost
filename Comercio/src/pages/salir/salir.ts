import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { envirotment as ENV } from '../../environments/environments';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-salir',
  templateUrl: 'salir.html',
})
export class SalirPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage : Storage) {

    this.limpiarValoresPorDefecto();
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalirPage');
  }

  limpiarValoresPorDefecto() {
   /* this.storage.set('id', ' ');
    this.storage.set('token', ' ');
    this.storage.set('idComercio', ' ');

    this.storage.set('comercio', ' ');*/
    this.storage.set('usuarioLogin', ' ');

    ENV.NOMBRE_USUARIO = ' ';
    ENV.ID_USUARIO = ' ';
    ENV.COMERCIO_ID = ' ';
    ENV.TOKEN = ' ';
    ENV.COMERCIO_LOGIN = ' ';
    ENV.ID_USUARIO= ' ';
    ENV.TOKEN = ' ';
    ENV.NOMBRE_COMERCIO = ' ';
    ENV.RUBRO_COMERCIO = ' ';
  }

}

