import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LoginPage } from '../login';
import { AltaClientePage } from '../../Comercio/alta/alta-cliente/alta-cliente';
import { RegistroPage } from '../model/registro';

@IonicPage()
@Component({
  selector: 'page-login-selector',
  templateUrl: 'login-selector.html',
})
export class LoginSelectorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  volver() : void {
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }

  altaComercio(){
    this.navCtrl.push(AltaClientePage);
  }

  altaProveedor(){
    let modal = this.modalCtrl.create(RegistroPage);
        modal.present();
  }
}
