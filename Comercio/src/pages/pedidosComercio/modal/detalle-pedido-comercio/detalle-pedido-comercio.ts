import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-detalle-pedido-comercio',
  templateUrl: 'detalle-pedido-comercio.html',
})
export class DetallePedidoComercioPage {
  pedido: any;
  inicial: string = 'encabezado';
  pedidoForm: FormGroup;
  cantidadProductos : number = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {

    this.pedido = navParams.get('data');
    if (this.pedido != undefined) {
      this.pedido.detallePedido.forEach(x =>{
        this.cantidadProductos = this.cantidadProductos + 1;
      })
      console.log(this.pedido);
      this.pedidoForm = this.formBuilder.group({
        nombreProveedor: [this.pedido.proveedor.entidad.razonSocial],
        tipoEntrega: [this.pedido.tipoEntrega],
        montoTotal: [this.pedido.totalPedido],
        fechaEntrega: [this.pedido.fechaEntrega],
        cantidadProducto: [this.cantidadProductos]
      });
    }


  }

  ionViewDidLoad() {


  }

  controlInicio() {

  }

  volver() {
    this.navCtrl.pop();
  }

}
