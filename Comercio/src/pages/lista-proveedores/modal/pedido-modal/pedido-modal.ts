import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-pedido-modal',
  templateUrl: 'pedido-modal.html',
})
export class PedidoModalPage {

  producto: any;
  nuevoProductoForm: FormGroup;
  nuevoProducto: any;
  itemProductoSelected: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    public formBuilder: FormBuilder) {

    this.producto = navParams.get('data');
    console.log(this.producto);

    this.itemProductoSelected = this.producto.unidadesMedida[0] || 1;

    console.log(this.itemProductoSelected)
    this.nuevoProductoForm = formBuilder.group({
      cantidad: ['', Validators.required],
      unidadMedida: [this.itemProductoSelected]
    });
    this.nuevoProducto = {
      _id: ' ',
      cantidad: 0,
      unidadMedida: ' ',
      nombreProducto: ' '
    };
  }

  ionViewDidLoad() {

  }

  dismiss() {

    this.nuevoProducto._id = this.producto._id;
    this.nuevoProducto.nombreProducto = this.producto.nombreProducto;
    this.nuevoProducto.cantidad = this.nuevoProductoForm.controls['cantidad'].value;
    this.nuevoProducto.unidadMedida = this.itemProductoSelected;

    this.viewCtrl.dismiss(this.nuevoProducto);

  }

  onUnidadMedidaChange(unidad: any) {
    this.itemProductoSelected = unidad;
  }

  volver1() {
    this.nuevoProducto.cantidad = 0;
    this.viewCtrl.dismiss(this.nuevoProducto);
  }
}
