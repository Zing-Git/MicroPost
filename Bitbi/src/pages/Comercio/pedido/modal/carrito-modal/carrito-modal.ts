import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Pedido } from '../../../../../modelo/pedido';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { ComercioProvider } from '../../../../../providers/comercio/comercio';

/**
 * Generated class for the CarritoModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carrito-modal',
  templateUrl: 'carrito-modal.html',
})
export class CarritoModalPage {

  carritoForm: FormGroup;
  pedido: Pedido;
  fechaEntrega: string = new Date().toISOString();
  fechaMinima: Date = new Date();
  comentario: string = '.';
  productosViewModel: any[];
  arrayProductosviewModel: any[] = new Array();
  visualItem: boolean = false;
  total: number = 0;
  contador : number;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private viewCtrl: ViewController,
    private comercioService: ComercioProvider,
    private loadingCtrl: LoadingController) {

    this.pedido = navParams.get('data');   //JSON.parse(ENV.CARRITO);
      this.contador = 0;
    this.pedido.productos.forEach(element => {
      let subtotal = element.cantidad * element.precioProveedor;
      this.total = this.total + subtotal;
      this.contador +=1;
    });

    this.fechaMinima.setDate(this.fechaMinima.getDate() + 1);
    this.fechaEntrega = this.fechaMinima.toISOString();
    console.log(this.pedido);
  }

  sacarProducto(prod: any) {

    let index = this.pedido.productos.indexOf(prod);
    if (index > -1) {
      this.pedido.productos.splice(index, 1);
    }
    this.total = 0;
    this.contador = 0;
    this.pedido.productos.forEach(element => {
      let subtotal = element.cantidad * element.precioProveedor;
      this.total = this.total + subtotal;
      this.contador +=1;
    });

  }

  volver() {
    this.viewCtrl.dismiss(this.pedido.productos);
  }

  showItem(): void {
    this.visualItem = !this.visualItem;

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
        html: '<strong><p style="font-size: 12px;">El pedido llegará a tu proveedor.<br/> Si queres agregá un comentario.</p></strong>',
       
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

          Swal('Cancelado', 'Pedido Cancelado, siga cargando su carrito', 'error')
          this.viewCtrl.dismiss(this.pedido);

        } else {
          if (result.value) {
            if (result.value != '.') {
              this.pedido.comentario = result.value;
            } else {
              this.pedido.comentario = 'Gracias'
            }

          } else {
            this.pedido.comentario = 'Gracias'
          }
          const loader = this.loadingCtrl.create({
            content: "Procesando Información, aguarde unos segundos, Gracias..."
          });
          loader.present();
          this.comercioService.postPedidoProveedor(this.pedido).subscribe(result => {
            
            if (typeof result != 'undefined') {
              if (result.ok) {
                Swal({
                  showCancelButton: false,
                  confirmButtonText: 'Ok!',
                  confirmButtonColor: '#488aff',
                  title: 'Felicidades',
                  text: 'Tu pedido fue enviado.',
                  type: 'success'
                })
                //this.navCtrl.setRoot(ListaProveedoresPage);
                this.viewCtrl.dismiss();
                loader.dismiss();
              } else {

                Swal(
                  'Advertencia',
                  result.message,
                  'error'
                )
                loader.dismiss();
              }
            }
          })
          //this.navCtrl.push(AltaLoginPage, { data: this.clienteViewModel});
          // https://sweetalert2.github.io/#handling-dismissals
        }

      })

    } else {
      
    }
  }

}
