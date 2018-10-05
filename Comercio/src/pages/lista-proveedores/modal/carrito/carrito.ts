import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pedido } from '../../../../modelo/pedido';
import { ComercioProvider } from '../../../../providers/comercio/comercio';
import { envirotment as ENV } from '../../../../environments/environments';
import Swal from 'sweetalert2';
import { AuxiliarProvider } from '../../../../providers/auxiliar/auxiliar';
import { PedidoModalPage } from '../pedido-modal/pedido-modal';
import { ListaProveedoresPage } from '../../lista-proveedores';

@Component({
    selector: 'page-carrito',
    templateUrl: 'carrito.html',
})
export class CarritoPage {

    carritoForm: FormGroup;
    pedido: Pedido;

    productosViewModel: any[];
    arrayProductosviewModel: any[] = new Array();
    //nuevoArrayProductos: any[];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public formBuilder: FormBuilder,
        private comercioService: ComercioProvider,
        private auxiliar: AuxiliarProvider, private viewCtrl: ViewController
    ) {

        this.pedido = navParams.get('data');   //JSON.parse(ENV.CARRITO);
        //this.nuevoArrayProductos = this.auxiliar.crearArray(this.pedido.productos);
        console.log('en el carrito');
        console.log(this.pedido);
    }

    ionViewDidLoad() { }


    sacarProducto(prod: any) {

        let index = this.pedido.productos.indexOf(prod);
        if (index > -1) {
            this.pedido.productos.splice(index, 1);
        }
        console.log(this.pedido.productos);
        //this.pedido.productos = this.nuevoArrayProductos;

        //ENV.CARRITO = JSON.stringify(this.pedido);
        //console.log(ENV.CARRITO);
    }

    pedirProducto() {

        //ENV.CARRITO = JSON.stringify(this.pedido);             //primero almaceno el pedido
        //ENV.PEDIDO = JSON.stringify(this.pedido.productos);    //segundo actualizo el listado de productos en caso de haber actualizado

        if (this.pedido.productos.length > 0) {

            this.pedido.productos.forEach(x => {                   //tercero elaboro el pedido para enviar
                this.arrayProductosviewModel.push({
                    _id: x._id,
                    cantidad: x.cantidad,
                    unidadMedida: x.unidadMedida
                })
            })
            this.pedido.productos = this.arrayProductosviewModel;

            Swal({
                title: 'CARRITO!',
                text: 'Desea enviar el Pedido?',
                type: 'success',
                showCancelButton: true,
                confirmButtonText: 'Si, ENVIAR!',
                cancelButtonText: 'No, Cancelar'
            }).then((result) => {
                if (result.value) {

                    this.comercioService.postPedidoProveedor(this.pedido).subscribe(result => {
                        console.log(result);
                        if (typeof result != 'undefined') {
                            if (result.ok) {
                                Swal(
                                    'Felicidades',
                                    result.message,
                                    'success'
                                )
                                this.navCtrl.push(ListaProveedoresPage);
                                //this.navCtrl.pop();
                            } else {
                                Swal(
                                    'Advertencia',
                                    result.message,
                                    'error'
                                )
                            }
                        }
                    })
                    //this.navCtrl.push(AltaLoginPage, { data: this.clienteViewModel});
                    // https://sweetalert2.github.io/#handling-dismissals
                } else if (result.dismiss === Swal.DismissReason.cancel) {

                    Swal(
                        'Canelado',
                        'Todo Ok, Gracias',
                        'error'
                    )

                    this.viewCtrl.dismiss(this.pedido);
                }
            })
            
        }else{
            console.log(this.pedido.productos);
        }
    }


    volver() {
        //Swal.close;
        //this.pedido.productos = this.nuevoArrayProductos;
        //ENV.CARRITO = JSON.stringify(this.pedido);             //primero almaceno el pedido
        //ENV.PEDIDO = JSON.stringify(this.pedido.productos);    //segundo actualizo el listado de productos en caso de haber actualizado
        //this.navCtrl.pop();

        this.viewCtrl.dismiss(this.pedido);
    }

}