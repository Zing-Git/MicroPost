import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Swal from 'sweetalert2';
/**
 * Generated class for the MensajeroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mensajero',
  templateUrl: 'mensajero.html',
})
export class MensajeroPage {

  //api: string = 'https://api.whatsapp.com/send?phone=';
  api: string = 'https://wa.me/';
  urlCall: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MensajeroPage');
  }

  async openModal() {

    const { value: text } = await Swal({
      input: 'textarea',
      inputPlaceholder: 'Type your message here...',
      showCancelButton: true
    })

    if (text) {
      var replaced = text.split(' ').join('%20');
      //https://api.whatsapp.com/send?phone=17862013838&text=Hola%20quiero%20info
      Swal({
        title: 'Pedido Listo!',
        html: '<strong><p style="font-size: 12px;">El pedido llegará a tu proveedor.<br/> Si queres agregá un comentario.</p></strong>',

        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Enviar!',
        confirmButtonColor: '#488aff',
        cancelButtonColor: '#488aff',
        reverseButtons: true,
        inputValue: replaced,
      }


      )
    } else {

    }
  }

  enviarWhatsapp() {
    Swal({
      title: 'Api de Whatsapp!',
      html: '<strong><p style="font-size: 12px;">Escriba una consulta a tu Cliente.<br/> Agrega comentario aquí abajo.</p></strong>',
      inputPlaceholder: 'Escribe tu mensaje aquí...',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Enviar!',
      confirmButtonColor: '#488aff',
      cancelButtonColor: '#488aff',
      reverseButtons: true,
      input: 'textarea'

    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {

        Swal('Cancelado', 'Se canceló la comunicación', 'error')
        //this.viewCtrl.dismiss(this.pedido);

      } else {
        if (result.value) {
          var replaced = result.value.split(' ').join('%20');
          //this.urlCall = this.api + '5493886001968' +'&text=' +replaced;
          this.urlCall = this.api + '5493886001968' + '/?text=' + replaced;
          Swal({
            showCancelButton: false,
            confirmButtonText: 'Ok!',
            confirmButtonColor: '#488aff',
            title: 'Felicidades',
            text: 'El Mensaje es: ' + replaced,
            type: 'success'
          })
        } else {
          //this.pedido.comentario = 'Gracias'
        }


        //const loader = this.loadingCtrl.create({
        //content: "Procesando Información, aguarde unos segundos, Gracias..."
        //});
        //loader.present();
        /*this.comercioService.postPedidoProveedor(this.pedido).subscribe(result => {
          
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
        })*/
        //this.navCtrl.push(AltaLoginPage, { data: this.clienteViewModel});
        // https://sweetalert2.github.io/#handling-dismissals
      }

    })
  }
}
