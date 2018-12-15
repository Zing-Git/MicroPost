import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { envirotment as ENV } from '../../../../../environments/environments';
import { ProveedorProvider } from '../../../../../providers/proveedor/proveedor';

@IonicPage()
@Component({
  selector: 'page-lista-publicidad-modal',
  templateUrl: 'lista-publicidad-modal.html',
})
export class ListaPublicidadModalPage {
  publicidad: any;
  inicial: string = 'encabezado';
  publicidadForm: FormGroup;
  cantidadProductos: number = 0;
  proveedor: any;
  constructor(public proveedorService: ProveedorProvider, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public loadingCtrl: LoadingController) {

    this.publicidad = navParams.get('data');
    this.publicidad.fechaInicio = new Date(this.publicidad.fechaInicio).toLocaleDateString();
    this.publicidad.fechaFin = new Date(this.publicidad.fechaFin).toLocaleDateString();
    if (typeof this.publicidad !== 'undefined') {

      console.log(this.publicidad);

    }
    console.log(this.publicidad);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPublicidadModalPage');
  }

  volver() {
    this.navCtrl.pop();
  }

  cargarProveedor() {
    Swal({
      title: 'Confirme el proveedor ',
      text: 'Se va a enviar una invitacion a ' + this.publicidad.proveedor.entidad.razonSocial,
      type: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, ENVIAR!',
      confirmButtonColor: '#488aff',
      cancelButtonColor: '#488aff',
      reverseButtons: true

    }).then((result1) => {
      if (result1.value) {
        this.realizarPeticion();
      }

    })

  }

  //realiza peticion al proveedor de la imagen
  realizarPeticion() {
    let text = 'Te invito a formar parte de mi red, gracias.'
    let idComercio = ENV.COMERCIO_ID;
    const loader = this.loadingCtrl.create({
      content: "Procesando Información, aguarde unos segundos, Gracias..."

    });
    loader.present();
    this.proveedorService.postEnviarInvitacion(this.publicidad.proveedor._id, idComercio, text).subscribe(result => {
      if (result.ok === true) {

        Swal({

          title: 'Felicidades ya cumpliste!',
          text: 'Debes esperar a que el proveedor te agregue a la red de comercios. Te informaremos cuando eso ocurra.',
          type: 'success',
          showCancelButton: false,
          confirmButtonText: 'Si, Aceptar!',
          confirmButtonColor: '#488aff'
                      
                
        })

        //this.navCtrl.setRoot(ListaProveedoresModalPage);
        //this.navCtrl.popToRoot();
        this.volver();
        loader.dismiss();
      } else {
        loader.dismiss();
        Swal(
          'Error!',
          'Se produjo un error al enviar la peticion ',
          'error'
        );
      }
    });
  }
}
