import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { ProveedorProvider } from '../../../../../providers/proveedor/proveedor';
import { envirotment as ENV } from '../../../../../environments/environments';
import Swal from 'sweetalert2';

@IonicPage()
@Component({
  selector: 'page-lista-proveedores-modal',
  templateUrl: 'lista-proveedores-modal.html',
})
export class ListaProveedoresModalPage {

  existe: boolean = false;

  proveedoresViewModel: any[] = new Array();
  resultProveedores: any[];
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

  ionViewDidLoad() { }

  cargarInicial() {

    const loader = this.loadingCtrl.create({
      content: "Cargando Proveedores, espere unos segundos...",
      duration: 15000
    });
    loader.present();
    this.idComercio = ENV.COMERCIO_ID;
    this.proveedorService.postGetProveedoresDeComercio(this.idComercio).subscribe(result => {
      this.resultProveedores = result['proveedores'];
      this.proveedores = new Array();
      this.resultProveedores.forEach(x => {
        if (x.entidad !== null) {
          this.proveedores.push(x);
        }
      })

    });
    loader.dismiss();

  }

  realizarInvitacion(proveedor: any) {
    //this.navCtrl.push(InvitacionProveedorModalPage, { data: proveedor }, { animate: true });
    //const modal = this.modalCtrl.create(InvitacionProveedorModalPage, );
    //modal.present();
    this.showProveedor(proveedor);
  }

  showProveedor(proveedor: any) {
    let idProveedor = proveedor._id;
    const stringMio = ' <h2><strong>' + proveedor.entidad.razonSocial + '</strong></h2><h3><strong>' + proveedor.entidad.actividadPrincipal;
    Swal({
      title: 'Confirme el proveedor',
      html: stringMio,
      imageUrl: '../../../../assets/icon/camion.ico',
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Custom image',
      showCancelButton: true,
      animation: true,
      confirmButtonText: 'Si, ENVIAR!',
      confirmButtonColor: '#488aff',
      cancelButtonColor: '#488aff',
      reverseButtons: true,
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        this.enviarInvitacion(proveedor, idProveedor);
      }
    })
  }


  enviarInvitacion(proveedor: any, idProveedor: any) {
    console.log(proveedor);
    const loader = this.loadingCtrl.create({
      content: "Por favor Espere unos segundos...",
      duration: 20000
    });

    loader.present();
    this.proveedorService.getInvitaciones(idProveedor).subscribe(result => {
      let invitaciones = result['invitaciones'];
      console.log('respuesta del proveedor');
      console.log(result);
      if (result['ok'] === false) {
        this.existe = false;
      } else {
        invitaciones.forEach(x => {
          if (x.comercio._id === this.idComercio) {
            this.existe = true;

          }
        })
      }



      if (this.existe) {
        Swal({

          title: 'Paciencia',
          text: 'ya enviaste la solicitud a este proveedor, debes esperar su respuesta',
          type: 'success',
          showCancelButton: false,
          confirmButtonText: 'Ok!',
          confirmButtonColor: '#488aff'
        })
        loader.dismiss();
      } else {
        this.text = 'Te invito a formar parte de mi red, gracias.'


        this.proveedorService.postEnviarInvitacion(proveedor._id, this.idComercio, this.text).subscribe(result => {
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

          //this.navCtrl.pop();
        });
      }
    })

  }
  /*cargarProveedor(proveedor: any) {
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
  }*/

  doRefresh(refresher?: any) { //"?" in typescript means the parameter is optional

    this.cargarInicial();
    refresher && refresher.complete();//make sure refresher is truthy before calling complete

  }


}
