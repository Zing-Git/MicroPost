import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProveedorProvider } from '../../../../../providers/proveedor/proveedor';
import { envirotment as ENV } from '../../../../../environments/environments';
import Swal from 'sweetalert2';


@IonicPage()
@Component({
  selector: 'page-invitacion-proveedor-modal',
  templateUrl: 'invitacion-proveedor-modal.html',
})
export class InvitacionProveedorModalPage {
  proveedor: any;
  titulo: string;
  text: string;
  idComercio: string;
  domicilio: string;
  existe: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public proveedorService: ProveedorProvider,
    public proveedorServices: ProveedorProvider) {

    this.idComercio = ENV.COMERCIO_ID;

    this.proveedor = navParams.get('data');
    this.titulo = this.proveedor.entidad.razonSocial + ' le permitirá adquirir productos del rubro: ' + this.proveedor.entidad.actividadPrincipal
    this.domicilio = this.proveedor.entidad.domicilio.localidad + ', ' + this.proveedor.entidad.domicilio.barrio + ', ' + this.proveedor.entidad.domicilio.calle + ', ' + this.proveedor.entidad.domicilio.numeroCasa;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitacionProveedorModalPage');
  }

  volver() {
    this.navCtrl.pop();
  }

  enviarInvitacion() {

    this.proveedorService.getInvitaciones(this.proveedor._id).subscribe(result => {
      let invitaciones = result['invitaciones'];
      console.log('respuesta del proveedor');
      console.log(invitaciones);
      invitaciones.forEach(x => {
        if (x.comercio._id === this.idComercio) {
          this.existe = true;

        }
      })


      if (this.existe) {
        Swal({

          title: 'Paciencia',
          text: 'ya enviaste la solicitud a este proveedor, debes esperar su respuesta',
          type: 'success',
          showCancelButton: false,
          confirmButtonText: 'Ok!',
          confirmButtonColor: '#488aff'
        })
      } else {
        this.text = 'Te invito a formar parte de mi red, gracias.'
        const loader = this.loadingCtrl.create({
          content: "Por favor Espere unos segundos..."

        });
        loader.present();
        this.proveedorService.postEnviarInvitacion(this.proveedor._id, this.idComercio, this.text).subscribe(result => {
          if (result.ok === true) {

            Swal({

              title: 'Felicidades ya cumpliste!',
              text: 'Debes esperar a que el proveedor te agregue a la red de comercios. Te informaremos cuando eso ocurra.',
              type: 'success',
              showCancelButton: false,
              confirmButtonText: 'Ok!',
              confirmButtonColor: '#488aff'
            })


            loader.dismiss();
          } else {
            loader.dismiss();
            Swal(
              'Error!',
              'Se produjo un error al enviar la peticion ',
              'error'
            );
          }

          this.navCtrl.pop();
        });
      }
    })

  }

}
