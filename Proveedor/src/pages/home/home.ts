import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ListadoPedidosFiltradosPage } from '../pedido/listado-pedidos-filtrados/listado-pedidos-filtrados';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
    const loader = this.loadingCtrl.create({
      content: "Actualizando Informacion, aguarde unos segundos...",
      duration: 3000
    });
    loader.present();
    this.navCtrl.setRoot(ListadoPedidosFiltradosPage, {
      animate: true
    });
  }

  

}
