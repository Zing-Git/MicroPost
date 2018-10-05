import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuxiliarProvider } from '../../../providers/auxiliar/auxiliar';

@IonicPage()
@Component({
  selector: 'page-detalle-pedido-proveedor',
  templateUrl: 'detalle-pedido-proveedor.html',
})
export class DetallePedidoProveedorPage {

  pedido: any;
  inicial: string = 'encabezado';
  pedidoForm: FormGroup;
  cantidadProductos: number = 0;
  checkStatus: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public auxiliar: AuxiliarProvider) {

    this.pedido = navParams.get('data');
    if (this.pedido != undefined) {
      this.pedido.detallePedido.forEach(x => {
        this.cantidadProductos = this.cantidadProductos + 1;
      })
      console.log(this.pedido);
      this.pedidoForm = this.formBuilder.group({
        nombreComercio: [{ value: this.pedido.comercio.entidad.razonSocial, disabled: true }],
        tipoEntrega: [{ value: this.pedido.tipoEntrega, disabled: true }],
        montoTotal: [{ value: '$ ' + auxiliar.twoDecimals(this.pedido.totalPedido), disabled: true }],   //aqui probando
        fechaEntrega: [{ value: this.pedido.fechaEntrega, disabled: true }],
        cantidadProducto: [{ value: this.cantidadProductos, disabled: true }]
      });
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePedidoProveedorPage');
  }

  volver() {
    this.navCtrl.pop();
  }

  aceptar(): void{
    this.checkStatus = false;
  }

  rechazar(): void{
    this.checkStatus = true;
  }
}
