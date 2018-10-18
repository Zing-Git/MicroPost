import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { envirotment as ENV } from '../../../../environments/environments';
import { ProveedorProvider } from '../../../../providers/proveedor/proveedor';

@IonicPage()
@Component({
  selector: 'page-lista-publicidad-modal',
  templateUrl: 'lista-publicidad-modal.html',
})
export class ListaPublicidadModalPage {
  publicidad: any;
  inicial: string = 'encabezado';
  publicidadForm: FormGroup;
  cantidadProductos : number = 0;
  proveedor: any;
  constructor(public proveedorService: ProveedorProvider, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public loadingCtrl:LoadingController) {

    this.publicidad = navParams.get('data');
    if (this.publicidad != undefined) {
     
      console.log(this.publicidad);
      
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPublicidadModalPage');
  }
  
  volver(){
    this.navCtrl.pop();
  }

  cargarProveedor() {
    Swal({
      title:'Paso 2 de 3: Confirme el proveedor ' ,
      text: 'Se va a enviar una invitacion a ' + this.publicidad.proveedor.entidad.razonSocial,
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, ENVIAR!',
      confirmButtonColor: '#063079',
      cancelButtonColor: '#f53d3d',
      cancelButtonText: 'Cancelar'
    }).then((result1) => {
      if (result1.value) {
        this.realizarPeticion();
      }

    })

  }

  //realiza peticion al proveedor de la imagen
  realizarPeticion() {
    let text = 'Te invito a formar parte de mi red, gracias.'
    let idComercio= ENV.COMERCIO_ID;
    const loader = this.loadingCtrl.create({
      content: "Por favor Espere unos segundos..."

    });
    loader.present();
    this.proveedorService.postEnviarInvitacion(this.publicidad.proveedor._id, idComercio, text).subscribe(result => {
      if (result.ok === true) {
       
        Swal({

          title: 'Paso 3 de 3: Felicidades ya cumpliste!',
          text: 'Debes esperar a que el proveedor te agregue a la red de comercios. Te informaremos cuando eso ocurra.',
          type: 'success',
          showCancelButton: false,
          confirmButtonText: 'Si, Aceptar!',
          confirmButtonColor: '#063079',         
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
