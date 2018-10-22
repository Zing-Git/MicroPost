import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProveedorProvider } from '../../../../providers/proveedor/proveedor';
import { envirotment as ENV } from '../../../../environments/environments';
import Swal from 'sweetalert2';
import { ListaProveedoresModalPage } from '../lista-proveedores-modal/lista-proveedores-modal';


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
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public proveedorService: ProveedorProvider) {
    this.idComercio = ENV.COMERCIO_ID;
    this.proveedor = navParams.get('data');
    this.titulo= this.proveedor.entidad.razonSocial + ' le permitirá adquirir productos del rubro: ' + this.proveedor.entidad.actividadPrincipal
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitacionProveedorModalPage');
  }

  volver(){
    this.navCtrl.pop();
  }

  enviarInvitacion(){
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
          confirmButtonColor: '#063079',         
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
}
