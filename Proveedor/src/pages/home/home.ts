import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ListadoPedidosFiltradosPage } from '../pedido/listado-pedidos-filtrados/listado-pedidos-filtrados';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
    
  }

  goPage(){
    this.navCtrl.setRoot(ListadoPedidosFiltradosPage);
  }

}
