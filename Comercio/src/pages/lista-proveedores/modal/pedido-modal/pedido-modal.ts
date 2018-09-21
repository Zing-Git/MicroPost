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
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    public formBuilder: FormBuilder) {

    this.producto = navParams.get('data');

    this.nuevoProductoForm = formBuilder.group({
      cantidad: ['', Validators.required]
    });
    this.nuevoProducto = {
      _id:' ',
      cantidad : 0,
      unidadMedida : ''
    };
  }

  ionViewDidLoad() {

  }

  dismiss() {
    console.log('dentro del modal al hacer save');

    this.nuevoProducto._id = this.producto._id;
    this.nuevoProducto.cantidad = this.nuevoProductoForm.controls['cantidad'].value;
    console.log(this.nuevoProducto);
    this.viewCtrl.dismiss(this.nuevoProducto);
  
  }

  onUnidadMedidaChange(unidad: any) {
    this.nuevoProducto.unidadMedida = unidad;
  }

}