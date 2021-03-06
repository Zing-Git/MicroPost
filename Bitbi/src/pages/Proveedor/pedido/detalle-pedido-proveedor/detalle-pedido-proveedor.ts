import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, App } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuxiliarProvider } from '../../../../providers/auxiliar/auxiliar';
import Swal from 'sweetalert2';
import { PedidoProvider } from '../../../../providers/pedido/pedido';
import { envirotment as ENV } from '../../../../environments/environments';

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

  nombreComercio: string;
  celularComercio: any;
  //celularComercio: any;
  direccionComercio: string;
  actividadComercio: string;
  cuitComercio: string;

  urlCall: string;
  aceptado: boolean = false;
  mensajeRechazo: string;

  alias: string;

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
    this.nombreComercio = this.pedido.comercio.entidad.razonSocial;

    this.actividadComercio = this.pedido.proveedor.entidad.actividadPrincipal;
    this.direccionComercio = this.pedido.comercio.entidad.domicilio.calle + 'Nº ' + this.pedido.comercio.entidad.domicilio.numeroCasa + ', ' + this.pedido.comercio.entidad.domicilio.barrio + ' - ' + this.pedido.comercio.entidad.domicilio.localidad + ' ( ' + this.pedido.comercio.entidad.domicilio.provincia + ' )';
    this.cuitComercio = this.pedido.proveedor.entidad.cuit;


    if (this.pedido.comercio.contactos.length < 1) {
      //this.celularProveedor = '0'
    } else {
      this.celularComercio = this.pedido.comercio.contactos[0].codigoPais + this.pedido.comercio.contactos[0].codigoArea + this.pedido.comercio.contactos[0].numeroCelular;
    }


    if (this.pedido != undefined) {
      this.encabezado = new Array();

      this.pedido.detallePedido.forEach(x => {
        this.cantidadProductos = this.cantidadProductos + 1;
      })

      this.encabezado.push({
        nombreComercio: this.nombreComercio,
        tipoEntrega: this.pedido.tipoEntrega,
        montoTotal: '$ ' + auxiliar.twoDecimals(this.pedido.totalPedido),
        fechaEntrega: this.pedido.fechaEntrega,
        cantidadProducto: this.cantidadProductos,
        direccion: this.direccionComercio,
        celular: this.celularComercio
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


  rechazar() {
    Swal({
      title: 'Quiere rechazar el Pedido?',
      type: 'question',
      input: 'textarea',
      inputPlaceholder: 'quiere enviar un mensaje? escriba aqui...',
      confirmButtonColor: '#488aff',
      confirmButtonClass: 'btn btn-success',
      confirmButtonText: 'Si, RECHAZAR!',
      cancelButtonText: 'Volver',
      cancelButtonColor: '#488aff',
      reverseButtons: true,
      showCancelButton: true,
      animation: true,
      customClass: 'animated tada',
      inputValidator: (result) => {
        return new Promise((resolve) => {
          let respuesta: string = 'Estimado cliente, lamentamos informarle que en este momento no podemos cumplir el pedido, repita el pedido en otro momento.';
          console.log(result);
          if (result) {
            this.aceptado = true;
            ENV.MENSAJE_RECHAZO = result;
            resolve();

          } else {
            this.aceptado = false;
            ENV.MENSAJE_RECHAZO = respuesta;
            resolve()
          }


        });
      }
    }).then(resultado => {
      if (resultado) {

        const loader = this.loadingCtrl.create({
          content: "Actualizando Información, aguarde unos segundos, Gracias...",
          duration: 15000
        });

        loader.present();
        console.log(ENV.MENSAJE_RECHAZO);
        this.pedidoServices.postRechazarPedido(this.pedido.idPedido, ENV.MENSAJE_RECHAZO,this.alias).subscribe(result => {

          if (typeof result != 'undefined') {

            if (result.ok) {
              Swal(
                'Procesado',
                result.message,
                'success'
              );
              this.pedido.estadoPedido = 'RECHAZADO';
              this.mensajeRechazo = ENV.MENSAJE_RECHAZO;
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

      } else if (resultado.dismiss === Swal.DismissReason.cancel) {
      
        /* Swal(
           'Canelado',
           'Todo Ok, Gracias',
           'error'
         )*/

        //this.viewCtrl.dismiss(this.pedido);
      }
    })



  }

  enviarRechazo() {

    const loader = this.loadingCtrl.create({
      content: "Actualizando Información, aguarde unos segundos, Gracias..."
    });

    loader.present();
    console.log(ENV.MENSAJE_RECHAZO);
    this.pedidoServices.postRechazarPedido(this.pedido.idPedido, ENV.MENSAJE_RECHAZO,this.alias).subscribe(result => {

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

  }

  aceptar(): void {
    let textoTitle = 'Quieres Aceptar el Pedido? Este comercio es nuevo en tu Red';
    if (this.pedido.comercioPerteneceARedProveedor) {
      textoTitle = 'Quieres Aceptar el Pedido?';

      Swal({

        text: textoTitle,  //comercioPerteneceARedProveedor
        type: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'ACEPTAR!',
        confirmButtonColor: '#488aff',
        cancelButtonColor: '#488aff',
        reverseButtons: true,
        animation: true,
        customClass: 'animated tada',

      }).then((result) => {
        if (result.value) {
          const loader = this.loadingCtrl.create({
            content: "Procesando Información, aguarde unos segundos, Gracias...",
            duration: 15000
          });
          loader.present();
          this.pedidoServices.postAceptarPedido(this.pedido.idPedido, '').subscribe(result => {

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
                  'Ocurrio un problema, vuelva a Intentar!',
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
         // this.viewCtrl.dismiss(this.pedido);    PROBAR
        }
      })

    } else {
      let textoBody = '<p style="font-size: 8px;">Comercio:  ' + this.nombreComercio + '</p>.<br/>' +
        '<p style="font-size: 8px;">Actividad:  ' + this.actividadComercio + '</p>.<br/>' +
        '<p style="font-size: 8px;">Dirección:  ' + this.direccionComercio + '</p>.<br/>' +
        '<p style="font-size: 8px;">CUIT:  ' + this.cuitComercio + '</p>.<br/>' +
        '<p style="font-size: 8px;">Telefono:  ' + this.celularComercio + '</p>.<br/>' +
        '.<br/> queres ponerle un "alias" para identificarlo? .</p>';

      Swal({
        title: textoTitle,
        html: textoBody,

        type: 'question',
        input: 'text',
        inputPlaceholder: 'ingrese alias...',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'ACEPTAR!',
        confirmButtonColor: '#488aff',
        cancelButtonColor: '#488aff',
        reverseButtons: true,
        animation: true,
        customClass: 'animated tada',
        inputValidator: (result) => {
          return new Promise((resolve) => {

            console.log(result);
            if (result) {
              this.aceptado = true;
              this.alias = result;
              resolve();

            } else {
              this.aceptado = false;
              this.alias = null;
              resolve()
            }


          });
        }
      }).then(resultado => {
        console.log(resultado);
        if (resultado && resultado.dismiss !== Swal.DismissReason.cancel) {
          const loader = this.loadingCtrl.create({
            content: "Procesando Información, aguarde unos segundos, Gracias...",
            duration: 15000
          });
          loader.present();

          this.pedidoServices.postAceptarPedido(this.pedido.idPedido, this.alias).subscribe(result => {
            console.log(result);
            if (typeof result != 'undefined') {
              if (result.ok) {
                Swal({
                  title: 'Felicidades, Pedido Aceptado',
                  text: 'Acabas de agregar un comercio más a tu red de puntos de venta. Bitbi te ayuda a crecer',
                  type: 'success',
                  showCancelButton: false,
                  confirmButtonText: 'GRACIAS!',
                  confirmButtonColor: '#488aff'
                });

                this.pedido.estadoPedido = 'ACEPTADO';
                this.viewCtrl.dismiss(this.pedido);
                loader.dismiss();

              } else {
                Swal(
                  'Advertencia',
                  result.message,
                  'error'
                );

                loader.dismiss();
              }
            }
          })
        } else if (resultado.dismiss === Swal.DismissReason.cancel) {
          //this.viewCtrl.dismiss(this.pedido); //volver   PROBAR
        }

      })
    }

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
      let info = this.nombreProveedor + ' - ' + mensaje;
      let api: string = 'https://wa.me/'; //https://api.whatsapp.com/send?phone=
      let miMensaje = info.split(' ').join('%20')
      this.urlCall = api + this.celularComercio + '/?text=' + miMensaje;
      window.open(this.urlCall);

    }
    this.volver();
  }

}
