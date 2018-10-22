import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, App } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuxiliarProvider } from '../../../providers/auxiliar/auxiliar';
import Swal from 'sweetalert2';
import { PedidoProvider } from '../../../providers/pedido/pedido';

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
  checkAceptar: boolean = false;
  checkRechazar: boolean = false;
  idPedido: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public auxiliar: AuxiliarProvider,
    public pedidoServices: PedidoProvider,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public appCtrl: App) {

    this.pedido = navParams.get('data');
    if (this.pedido != undefined) {
      this.pedido.detallePedido.forEach(x => {
        this.cantidadProductos = this.cantidadProductos + 1;
      })

      this.pedidoForm = this.formBuilder.group({
        nombreComercio: [{ value: this.pedido.comercio.entidad.razonSocial, disabled: true }],
        tipoEntrega: [{ value: this.pedido.tipoEntrega, disabled: true }],
        montoTotal: [{ value: '$ ' + auxiliar.twoDecimals(this.pedido.totalPedido), disabled: true }],   //aqui probando
        fechaEntrega: [{ value: this.pedido.fechaEntrega, disabled: true }],
        cantidadProducto: [{ value: this.cantidadProductos, disabled: true }]
      });

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

      text: 'Seleccione una opcion de Pedido?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, RECHAZAR!',
      confirmButtonColor: 'primary',
      cancelButtonColor: 'danger',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {
        //TODO aqui poner un comentario
        this.pedidoServices.postRechazarPedido(this.pedido.idPedido).subscribe(result => {

          if (typeof result != 'undefined') {

            if (result.ok) {
              Swal(
                'Felicidades',
                result.message,
                'success'
              );
             this.pedido.estadoPedido='RECHAZADO';
              const loader = this.loadingCtrl.create({
                content: "Actualizando Informacion, aguarde unos segundos...",
                duration: 2500
              });
              loader.present();
              //this.viewCtrl.dismiss();
              //this.viewCtrl.dismiss().then(() => this.app.getRootNav().setRoot('SomeLazyPage'));
              //this.navCtrl.setRoot(ListadoPedidosFiltradosPage);
              //this.navCtrl.popToRoot();
              //this.viewCtrl.dismiss();
              //this.appCtrl.getRootNav().push(ListadoPedidosFiltradosPage);
              this.viewCtrl.dismiss(this.pedido);
            } else {
              Swal(
                'Advertencia',
                result.message,
                'error'
              )
            }
          } else {
            Swal(
              'Advertencia',
              'Ocurrio un problema, vuelva a Intentar!',
              'error'
            )
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
  }

  aceptar(): void {
    Swal({

      text: 'Seleccione una opcion de Pedido?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, ACEPTAR!',
      confirmButtonColor: 'primary',
      cancelButtonColor: 'danger',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {

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
              //this.appCtrl.getRootNav().push(ListadoPedidosFiltradosPage);
              //this.viewCtrl.dismiss();
            } else {
              Swal(
                'Advertencia',
                result.message,
                'error'
              )
            }
          } else {
            Swal(
              'Advertencia',
              'Ocurrio un problema, vuelva a Intentar!',
              'error'
            )
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
  }
}
