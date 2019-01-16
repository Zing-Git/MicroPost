import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'page-pedido-modal',
  templateUrl: 'pedido-modal.html',
})
export class PedidoModalPage {

  producto: any;
  nuevoProductoForm: FormGroup;
  nuevoProducto: any;
  unidadMedida: string;
  itemSubtotal: number;
  nombreProducto: any;
  precioProveedorCalculo: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    public formBuilder: FormBuilder) {

    this.producto = navParams.get('data');
    console.log(this.producto);

    this.unidadMedida = this.producto.unidadMedida ;
    this.itemSubtotal = this.producto.precioProveedor;  
    this.nombreProducto = this.producto.nombreProducto;
    this.precioProveedorCalculo = this.producto.precioProveedor;
    
    console.log(this.unidadMedida)
    
    this.nuevoProductoForm = formBuilder.group({
      cantidad: ['', Validators.required],
      unidadMedida: [this.unidadMedida],
      precioProveedor: [ '$ ' +this.producto.precioProveedor]
    });

    this.nuevoProducto = {
      _id: ' ',
      cantidad: 0,
      unidadMedida: this.unidadMedida,
      nombreProducto: ' ',
      precioProveedor: 0
    };
  }

  ionViewDidLoad() {

  }

  dismiss() {

    this.nuevoProducto._id = this.producto._id;
    this.nuevoProducto.nombreProducto = this.producto.nombreProducto;
    this.nuevoProducto.cantidad = this.nuevoProductoForm.controls['cantidad'].value;
    //this.nuevoProducto.unidadMedida = this.itemProductoSelected;
    this.nuevoProducto.precioProveedor =  this.producto.precioProveedor;

    this.viewCtrl.dismiss(this.nuevoProducto);

  }

  /*onUnidadMedidaChange(unidad: any) {
    this.itemProductoSelected = unidad;
  }*/

  volver() {
    this.nuevoProducto.cantidad = 0;
    this.viewCtrl.dismiss(this.nuevoProducto);
  }
  
}
