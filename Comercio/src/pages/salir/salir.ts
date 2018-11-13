import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { envirotment as ENV } from '../../environments/environments';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-salir',
  templateUrl: 'salir.html',
})
export class SalirPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    this.limpiarValoresPorDefecto();
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalirPage');
  }

  limpiarValoresPorDefecto() {
    this.storage.set('id', ' ');
    this.storage.set('token', ' ');
    this.storage.set('idComercio', ' ');

    this.storage.set('comercio', ' ');
    this.storage.set('usuarioLogin', ' ');

    ENV.NOMBRE_USUARIO = ' ';
    ENV.ID_USUARIO = ' ';
    ENV.COMERCIO_ID = ' ';
    ENV.TOKEN = ' ';
    ENV.COMERCIO_LOGIN = ' ';
  }

}

