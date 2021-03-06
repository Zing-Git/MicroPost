import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pedido } from '../../../../../modelo/pedido';
import { ComercioProvider } from '../../../../../providers/comercio/comercio';
import Swal from 'sweetalert2';

@Component({
    selector: 'page-carrito',
    templateUrl: 'carrito.html',
})
export class CarritoPage {

    carritoForm: FormGroup;
    pedido: Pedido;
    fechaEntrega: string = new Date().toISOString();
    fechaMinima: Date = new Date();
    comentario: string = 'Escriba un comentario...';
    productosViewModel: any[];
    arrayProductosviewModel: any[] = new Array();
    visualItem: boolean = false;
    total: number = 0;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public formBuilder: FormBuilder,
        private comercioService: ComercioProvider,
        private viewCtrl: ViewController
    ) {

        this.pedido = navParams.get('data');   //JSON.parse(ENV.CARRITO);

        this.pedido.productos.forEach(element => {
            let subtotal = element.cantidad * element.precioProveedor;
            this.total = this.total + subtotal;
        });

        this.fechaMinima.setDate(this.fechaMinima.getDate() + 1);
        this.fechaEntrega = this.fechaMinima.toISOString();

    }

    ionViewDidLoad() { }


    sacarProducto(prod: any) {

        let index = this.pedido.productos.indexOf(prod);
        if (index > -1) {
            this.pedido.productos.splice(index, 1);
        }
        this.total = 0;
        this.pedido.productos.forEach(element => {
            let subtotal = element.cantidad * element.precioProveedor;
            this.total = this.total + subtotal;
        });

    }

    pedirProducto() {

        if (this.pedido.productos.length > 0) {

            this.pedido.productos.forEach(x => {                   //tercero elaboro el pedido para enviar
                this.arrayProductosviewModel.push({
                    _id: x._id,
                    cantidad: x.cantidad,
                    unidadMedida: x.unidadMedida
                })
            })

            this.pedido.productos = this.arrayProductosviewModel;
            if (this.fechaEntrega === ' ') {
                let fecha = new Date();
                fecha.setDate(fecha.getDate() + 1);
                this.fechaEntrega = fecha.toISOString();
            }

            this.pedido.fechaEntrega = this.fechaEntrega;


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
                inputValue: this.comentario,
                input: 'text'

            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.cancel) {

                    Swal('Canelado', 'Pedido Cancelado, Gracias', 'error' )
                    this.viewCtrl.dismiss(this.pedido);
                    
                } else {
                    if (result.value) {
                        if (result.value != 'Escriba un comentario...') {
                            this.pedido.comentario = result.value;
                        }else{
                            this.pedido.comentario = 'Gracias'
                        }

                    } else {
                        this.pedido.comentario = 'Gracias'
                    }

                    this.comercioService.postPedidoProveedor(this.pedido).subscribe(result => {
                        console.log(result);
                        if (typeof result != 'undefined') {
                            if (result.ok) {
                                Swal({
                                    showCancelButton: false,
                                    confirmButtonText: 'Si, Aceptar!',
                                    confirmButtonColor: '#488aff',
                                    title: 'Felicidades',
                                    text: 'El proveedor ya recibió tu pedido. Te informaremos cuando el proveedor acepte tu pedido.',
                                    type: 'success'
                                })
                                //this.navCtrl.setRoot(ListaProveedoresPage);
                                this.viewCtrl.dismiss();

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
                }
               
            })

        } else {
            console.log(this.pedido.productos);
        }
    }


    volver() {
        //Swal.close;
        //this.pedido.productos = this.nuevoArrayProductos;
        //ENV.CARRITO = JSON.stringify(this.pedido);             //primero almaceno el pedido
        //ENV.PEDIDO = JSON.stringify(this.pedido.productos);    //segundo actualizo el listado de productos en caso de haber actualizado
        //this.navCtrl.pop();

        this.viewCtrl.dismiss(this.pedido.productos);
    }

    showItem(): void {
        this.visualItem = !this.visualItem;

    }


}