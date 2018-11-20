import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { ProveedorProvider } from '../../../../providers/proveedor/proveedor';
import { envirotment as ENV } from '../../../../environments/environments';
import Swal from 'sweetalert2';
import { InvitacionProveedorModalPage } from '../invitacion-proveedor-modal/invitacion-proveedor-modal';

@IonicPage()
@Component({
  selector: 'page-lista-proveedores-modal',
  templateUrl: 'lista-proveedores-modal.html',
})
export class ListaProveedoresModalPage {

  proveedoresViewModel: any[] = new Array();
  proveedores: any[];
  idComercio: string;
  text: string;
  peticion: any;
  permitirRefresh: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private proveedorService: ProveedorProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController) {

    
    this.cargarInicial();
  }

  ionViewDidLoad() {  }

  cargarInicial() {

    const loader = this.loadingCtrl.create({
      content: "Cargando Proveedores, espere unos segundos..."
    });
    loader.present();
    this.idComercio = ENV.COMERCIO_ID;
    this.proveedorService.postGetProveedoresDeComercio(this.idComercio).subscribe(result => {
      this.proveedores = result['proveedores'];  
      console.log(this.proveedores);    
    });
    loader.dismiss();
    
  }

  realizarInvitacion(proveedor: any) {
    this.navCtrl.push(InvitacionProveedorModalPage, { data: proveedor }, { animate: true });
    //const modal = this.modalCtrl.create(InvitacionProveedorModalPage, );
    //modal.present();
  }

  cargarProveedor(proveedor: any) {
    Swal({
      title: 'Confirme el proveedor ',
      text: proveedor.entidad.razonSocial + ' le permitirá adquirir productos del rubro: ' + proveedor.entidad.actividadPrincipal,
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, ENVIAR!',
      confirmButtonColor: '#488aff',
      cancelButtonColor: '#488aff',
      reverseButtons: true,
      cancelButtonText: 'Cancelar'
    }).then((result1) => {
      if (result1.value) {
        this.realizarPeticion(proveedor);
      }

    })

  }

  realizarPeticion(proveedor: any) {
    this.text = 'Te invito a formar parte de mi red, gracias.'
    const loader = this.loadingCtrl.create({
      content: "Por favor Espere unos segundos..."

    });
    loader.present();
    this.proveedorService.postEnviarInvitacion(proveedor._id, this.idComercio, this.text).subscribe(result => {
      if (result.ok === true) {

        Swal({

          title: 'Felicidades ya cumpliste!',
          text: 'Debes esperar a que el proveedor te agregue a la red de comercios. Te informaremos cuando eso ocurra.',
          type: 'success',
          showCancelButton: false,
          confirmButtonText: 'Si, Aceptar!',
          confirmButtonColor: '#488aff'
        })
        loader.dismiss();
        //this.navCtrl.setRoot(ListaProveedoresModalPage);
        //this.navCtrl.popToRoot();

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

  doRefresh(refresher?: any) { //"?" in typescript means the parameter is optional

    this.cargarInicial();
    refresher && refresher.complete();//make sure refresher is truthy before calling complete

  }


}
