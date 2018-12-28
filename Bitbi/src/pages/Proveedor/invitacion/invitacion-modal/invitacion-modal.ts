import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { envirotment as ENV } from '../../../../environments/environments';
import Swal from 'sweetalert2';
import { ProveedorProvider } from '../../../../providers/proveedor/proveedor';
import { TiposPersoneria } from './../../../../modelo/tiposPersoneria';

@IonicPage()
@Component({
  selector: 'page-invitacion-modal',
  templateUrl: 'invitacion-modal.html',
})
export class InvitacionModalPage {

  alias: string;
  aceptado: boolean = false;
  invitacion: any;
  tipo: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public proveedorServices: ProveedorProvider,
              public loadingCtrl: LoadingController,
              private viewCtrl: ViewController) {

                this.invitacion = navParams.get('data');
                this.tipo = navParams.get('data1');
                console.log(this.invitacion);
                console.log(this.tipo);
                switch (this.tipo) {
                  case 'aceptado':
                    this.aceptar(this.invitacion);
                    break;
                  case 'rechazado':{
                    this.rechazar(this.invitacion);
                    break;
                  }
                  default:
                  console.log(this.tipo);
                  console.log(this.invitacion);
                    break;
                }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitacionModalPage');
  }

  aceptar(invitacion: any) {


    Swal({

      text: 'Desea Aceptar Invitacion?',
      type: 'question',
      input: 'text',
      inputPlaceholder: 'si desea puede agregar un alias...',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, ACEPTAR!',
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

        this.proveedorServices.postAceptarRechazar(invitacion._id, true, this.alias).subscribe(result => {

          if (typeof result != 'undefined') {
            if (result.ok) {
              Swal({
                title: 'Felicidades',
                text: 'Acabas de agregar un comercio más a tu red de puntos de venta. Bitbi te ayuda a crecer',
                type: 'success',
                showCancelButton: false,
                confirmButtonText: 'GRACIAS!',
                confirmButtonColor: '#488aff'
              });
              this.dismiss();  //volver
              loader.dismiss();
            } else {
              Swal(
                'Advertencia',
                result.message,
                'error'
              );

              this.dismiss();  //volver
              loader.dismiss();
            }
          }
        })       
      } else if (resultado.dismiss === Swal.DismissReason.cancel) {
        this.dismiss();  //volver
      }

    })
    //this.obtenerDatosImportantes();
    //this.doRefresh();  volver
  }

  rechazar(invitacion: any) {


    Swal({

      text: 'Desea Rechazar Invitacion?',
      type: 'question',
      showCancelButton: true,
      cancelButtonText: 'Volver',
      confirmButtonText: 'Si, RECHAZAR!',
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
        this.proveedorServices.postAceptarRechazar(invitacion._id, false, this.alias).subscribe(result => {
          if (typeof result != 'undefined') {

            if (result.ok) {
              Swal(
                'Realizado!',
                result.message,
                'success'
              );
              this.dismiss();  //volver
              loader.dismiss();
            } else {
              Swal(
                'Advertencia',
                result.message,
                'error'
              );
              this.dismiss();  //volver
              loader.dismiss();
            }
          }else{
            this.dismiss();  //volver
          }
        })      
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.dismiss();  //volver
      }
    })
    //this.obtenerDatosImportantes();
    //this.doRefresh();
  }

  dismiss(){
    this.viewCtrl.dismiss(this.invitacion);
  } 
}
