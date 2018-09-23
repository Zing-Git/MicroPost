import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pedido } from '../../../../modelo/pedido';
import { ComercioProvider } from '../../../../providers/comercio/comercio';
import Swal from 'sweetalert2';
import { ListaProveedoresPage } from '../../lista-proveedores';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-carrito',
    templateUrl: 'carrito.html',
})
export class CarritoPage {

    carritoForm: FormGroup;
    pedido: Pedido;

    productosViewModel: any[];
    arrayProductosviewModel: any[] = new Array();

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private viewCtrl: ViewController,
        public formBuilder: FormBuilder,
        private comercioService: ComercioProvider,
        private storage: Storage) {

        this.pedido = navParams.get('data');
        this.storage.get('pedido').then((val)=>{
            if(val != null && val != undefined){
                this.pedido = JSON.parse(val);
            }else{
                this.pedido =  new Pedido();
            }
        })
    }

    ionViewDidLoad() { }


    sacarProducto(prod: any) {

        let index = this.pedido.productos.indexOf(prod);
        if (index > -1) {
            this.pedido.productos.splice(index, 1);
        }
    }

    pedirProducto() {
        this.pedido.productos.forEach(x => {
            this.arrayProductosviewModel.push({
                _id : x._id,
                cantidad : x.cantidad,
                unidadMedida : x.unidadMedida
            })
        })
        this.pedido.productos = this.arrayProductosviewModel;
        
        this.comercioService.postPedidoProveedor(this.pedido).subscribe(result => {
            console.log(result);
            if (typeof result != 'undefined') {
                if (result.ok) {
                    Swal(
                        'Felicidades',
                        result.message,
                        'success'
                    )
                    this.navCtrl.setRoot(ListaProveedoresPage, {animate : true});
                } else {
                    Swal(
                        'Advertencia',
                        result.message,
                        'error'
                    )
                }
            }
        })
    }


    volver() {
        this.navCtrl.pop();
    }

}