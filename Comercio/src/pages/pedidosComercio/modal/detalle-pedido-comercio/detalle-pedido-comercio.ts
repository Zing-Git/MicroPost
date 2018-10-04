import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuxiliarProvider } from '../../../../providers/auxiliar/auxiliar';

@Component({
  selector: 'page-detalle-pedido-comercio',
  templateUrl: 'detalle-pedido-comercio.html',
})
export class DetallePedidoComercioPage {
  pedido: any;
  inicial: string = 'encabezado';
  pedidoForm: FormGroup;
  cantidadProductos : number = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private auxiliar: AuxiliarProvider) {

    this.pedido = navParams.get('data');
    if (this.pedido != undefined) {
      this.pedido.detallePedido.forEach(x =>{
        this.cantidadProductos = this.cantidadProductos + 1;
      })
      console.log(this.pedido);
      this.pedidoForm = this.formBuilder.group({
        nombreProveedor: [{value: this.pedido.proveedor.entidad.razonSocial, disabled: true}],
        tipoEntrega: [{value: this.pedido.tipoEntrega, disabled: true}],
        montoTotal: [{value: '$ ' + auxiliar.twoDecimals(this.pedido.totalPedido), disabled: true }],   //aqui probando
        fechaEntrega: [{value: this.pedido.fechaEntrega, disabled: true}],
        cantidadProducto: [{value: this.cantidadProductos, disabled: true}]
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
