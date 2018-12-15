import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
/*import { ListaProveedoresPage } from '../pedido/lista-proveedores';
import { ConfiguracionInicialPage } from '../configuracion-inicial/configuracion-inicial';
import { ListaProveedoresModalPage } from '../lista-proveedores/modal/lista-proveedores-modal/lista-proveedores-modal';
import { ListaPedidoComercioPage } from '../pedidosComercio/lista-pedido-comercio/lista-pedido-comercio';*/
import { Storage } from '@ionic/storage';
import Swal from 'sweetalert2';
import { envirotment as ENV } from '../../environments/environments';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  comentario: string;
  pedidos: any = new Array();

  constructor(public navCtrl: NavController,
    public navParams: NavParams, storage: Storage) {

    this.comentario = JSON.parse(ENV.CARRITO);
   Swal(this.comentario,this.comentario,'success');
  }

 /* goPageProveedores(){
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
  }*/

  lanzarCarrito(){
    Swal({
      title: 'Pedido Listo!',
      html: '<strong><p style="font-size: 12px;">Ya completaste tu pedido, solo debes presionar enviar y llegará inmediatamente a tu proveedor.<br/> Si quiere agregar un comentario escriba aquí abajo.</p></strong>',
      type: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Enviar!',
      confirmButtonColor: '#488aff',
      cancelButtonColor: '#488aff',                
      reverseButtons: true,      
      input: 'text'
    
  }).then((result) => {
      if (result.value) {
        console.log(result.value);
      }else{
        console.log(result);
      }
    })
  }
}
