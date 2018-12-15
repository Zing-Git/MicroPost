import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, App } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuxiliarProvider } from '../../../../providers/auxiliar/auxiliar';
import Swal from 'sweetalert2';
import { PedidoProvider } from '../../../../providers/pedido/pedido';

@IonicPage()
@Component({
  selector: 'page-detalle-pedido-proveedor',
  templateUrl: 'detalle-pedido-proveedor.html',
})
export class DetallePedidoProveedorPage {

  pedido: any = new Array();
  inicial: string = 'encabezado';
  pedidoForm: FormGroup;
  cantidadProductos: number = 0;
  checkAceptar: boolean = false;
  checkRechazar: boolean = false;
  idPedido: string;
  encabezado: any;
  nombreProveedor: string;
  celularProveedor: string;
  urlCall: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public auxiliar: AuxiliarProvider,
    public pedidoServices: PedidoProvider,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public appCtrl: App) {

    this.pedido = navParams.get('data');
      console.log(this.pedido);
      this.nombreProveedor = this.pedido.proveedor.entidad.razonSocial;
      this.celularProveedor = this.pedido.comercio.contactos[0].codigoPais +this.pedido.comercio.contactos[0].codigoArea + this.pedido.comercio.contactos[0].numeroCelular;
      console.log(this.celularProveedor);
    if (this.pedido != undefined) {
      this.encabezado = new Array();

      this.pedido.detallePedido.forEach(x => {
        this.cantidadProductos = this.cantidadProductos + 1;
      })

      this.encabezado.push({
        nombreComercio: this.pedido.comercio.entidad.razonSocial,
        tipoEntrega: this.pedido.tipoEntrega,
        montoTotal: '$ ' + auxiliar.twoDecimals(this.pedido.totalPedido),
        fechaEntrega: this.pedido.fechaEntrega,
        cantidadProducto: this.cantidadProductos,
        direccion: this.pedido.comercio.entidad.domicilio.calle + 'Nº ' + this.pedido.comercio.entidad.domicilio.numeroCasa + ', ' + this.pedido.comercio.entidad.domicilio.barrio + ' - ' + this.pedido.comercio.entidad.domicilio.localidad + ' ( ' + this.pedido.comercio.entidad.domicilio.provincia + ' )'
      })

      if (this.pedido.estadoPedido === 'PEDIDO INFORMADO') {
        this.checkAceptar = false;
        this.checkRechazar = false;
      } else {
        if (this.pedido.estadoPedido === 'RECHAZADO' && this.pedido.estadoTerminal) {
          this.checkAceptar = true;
          this.checkRechazar = true;
        } else {
          if (this.pedido.estadoPedido === 'RECHAZADO' && !this.pedido.estadoTerminal) {
            this.checkAceptar = false;
            this.checkRechazar = true;
          } else {
            if (this.pedido.estadoPedido === 'ACEPTADO' && this.pedido.estadoTerminal) {
              this.checkAceptar = true;
              this.checkRechazar = true;
            } else {
              if (this.pedido.estadoPedido === 'ACEPTADO' && !this.pedido.estadoTerminal) {
                this.checkAceptar = true;
                this.checkRechazar = false;
              }
            }
          }
        }
      }
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePedidoProveedorPage');
  }

  volver() {
    this.viewCtrl.dismiss(this.pedido);
  }


  rechazar(): void {
    //this.checkStatus = true;

    Swal({

      text: 'Quiere rechazar el Pedido?',
      type: 'question',
      showCancelButton: true,
      cancelButtonText: 'Volver',
      confirmButtonText: 'Si, RECHAZAR!',
      confirmButtonColor: '#488aff',
      cancelButtonColor: '#488aff',
      reverseButtons: true

    }).then((result) => {
      if (result.value) {
        const loader = this.loadingCtrl.create({
          content: "Actualizando Información, aguarde unos segundos, Gracias..."
        });
        loader.present();
        this.pedidoServices.postRechazarPedido(this.pedido.idPedido).subscribe(result => {

          if (typeof result != 'undefined') {

            if (result.ok) {
              Swal(
                'Procesado',
                result.message,
                'success'
              );
              this.pedido.estadoPedido = 'RECHAZADO';
              this.viewCtrl.dismiss(this.pedido);
              loader.dismiss();
            } else {
              Swal(
                'Advertencia',
                result.message,
                'error'
              )
              loader.dismiss();
            }
          } else {
            Swal(
              'Advertencia',
              'Ocurrio un problema, vuelva a Intentar!',
              'error'
            )
            loader.dismiss();
          }
        })
        //this.navCtrl.push(AltaLoginPage, { data: this.clienteViewModel});
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {

        /* Swal(
           'Canelado',
           'Se cancelo el proceso, volviendo a la página',
           'info'
         )*/

        this.viewCtrl.dismiss(this.pedido);
      }
    })
  }

  aceptar(): void {
    Swal({

      text: 'Quieres Aceptar el Pedido?',
      type: 'question',
      showCancelButton: true,
      cancelButtonText: 'Volver',
      confirmButtonText: 'Si, ACEPTAR!',
      confirmButtonColor: '#488aff',
      cancelButtonColor: '#488aff',
      reverseButtons: true

    }).then((result) => {
      if (result.value) {
        const loader = this.loadingCtrl.create({
          content: "Procesando Información, aguarde unos segundos, Gracias..."
        });
        loader.present();
        this.pedidoServices.postAceptarPedido(this.pedido.idPedido).subscribe(result => {

          if (typeof result != 'undefined') {
            if (result.ok) {
              Swal(
                'Felicidades',
                result.message,
                'success'
              );

              this.pedido.estadoPedido = 'ACEPTADO';
              this.viewCtrl.dismiss(this.pedido);
              loader.dismiss();
              //this.appCtrl.getRootNav().push(ListadoPedidosFiltradosPage);
              //this.viewCtrl.dismiss();
            } else {
              Swal(
                'Advertencia',
                result.message,
                'error'
              )
              loader.dismiss();
            }
          } else {
            Swal(
              'Advertencia',
              'Ocurrio un problema, vuelva a Intentar!',
              'error'
            )
            loader.dismiss();
          }
        })
        //this.navCtrl.push(AltaLoginPage, { data: this.clienteViewModel});
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {

        /* Swal(
           'Canelado',
           'Todo Ok, Gracias',
           'error'
         )*/

        this.viewCtrl.dismiss(this.pedido);
      }
    })
  }

  async callWhatsapp() {

    const { value: mensaje } = await Swal({
      title: 'Comunicarse con el Cliente',
      input: 'textarea',


      confirmButtonColor: '#488aff',
      confirmButtonClass: 'btn btn-success',
      confirmButtonText: 'Enviar',
      cancelButtonColor: '#488aff',
      reverseButtons: true,
      showCancelButton: true,
      animation: true,
      customClass: 'animated tada',
      inputValidator: (value) => {
        return new Promise((resolve) => {
          console.log(value);
          if (value) {
            resolve()
          } else {
            resolve('Debe escribir un texto')
          }
        })
      }
    })

    if (mensaje) {
      let info = this.nombreProveedor +' - '+ mensaje;
      let api: string = 'https://wa.me/'; //https://api.whatsapp.com/send?phone=
      let miMensaje = info.split(' ').join('%20')
      this.urlCall = api + this.celularProveedor + '/?text=' + miMensaje;
      window.open(this.urlCall);

    }
    this.volver();
  }

}
