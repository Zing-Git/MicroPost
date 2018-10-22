import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListaProveedoresPage } from '../pedido/lista-proveedores';
import { ConfiguracionInicialPage } from '../configuracion-inicial/configuracion-inicial';
import { ListaProveedoresModalPage } from '../lista-proveedores/modal/lista-proveedores-modal/lista-proveedores-modal';
import { ListaPedidoComercioPage } from '../pedidosComercio/lista-pedido-comercio/lista-pedido-comercio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  

  constructor(public navCtrl: NavController) {

  }

  goPageProveedores(){
    this.navCtrl.setRoot(ListaProveedoresModalPage);
  }

  goPageConfiguracionInicial(){
    this.navCtrl.setRoot(ConfiguracionInicialPage);
  }

  goPageProveedoresRed(){
    this.navCtrl.setRoot(ListaProveedoresPage)
  }

  goPageListaPedidos(){
    this.navCtrl.setRoot(ListaPedidoComercioPage);
  }
}
