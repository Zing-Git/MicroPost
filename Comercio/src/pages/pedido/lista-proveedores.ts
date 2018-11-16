import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, LoadingController } from 'ionic-angular';
import { Proveedor } from '../../modelo/proveedor';

import Swal from 'sweetalert2';

import { Storage } from '@ionic/storage';
import { ConfiguracionInicialPage } from '../configuracion-inicial/configuracion-inicial';
import { envirotment as ENV } from '../../environments/environments';
import { ListaProductosModalPage } from './modal/lista-productos-modal/lista-productos-modal';
import { ListaProveedoresModalPage } from '../lista-proveedores/modal/lista-proveedores-modal/lista-proveedores-modal';
import { AuxiliarProvider } from '../../providers/auxiliar/auxiliar';
import { LoginProvider } from '../../providers/login/login';

@IonicPage()
@Component({
  selector: 'page-lista-proveedores',
  templateUrl: 'lista-proveedores.html',
})
export class ListaProveedoresPage {
  proveedoresViewModel: Proveedor[] = [];
  datosComercio: any[];
  productosViewModel: any[];
  proveedores: any = new Array();
  permitirRefresh: boolean = false;

  newLogin: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public events: Events,
    public auxiliarServices: AuxiliarProvider,
    private login: LoginProvider,
    public loadingCtrl: LoadingController) {

      this.cargarDatosComercio();

  }

  cargarDatosComercio() {
    
    const loader = this.loadingCtrl.create({
      content: "Cargando datos, espere unos segundos, Gracias..."
    });
    loader.present();

    this.newLogin = JSON.parse(ENV.NEWLOGIN);

    this.proveedoresViewModel = new Array();

    this.login.getLogin(this.newLogin).subscribe(result => {

      this.datosComercio = result['comercioDB'];

      this.datosComercio.forEach(x => {
        this.proveedoresViewModel = x.proveedores;
      });
      this.proveedores = this.auxiliarServices.removeDuplicates(this.proveedoresViewModel, "_id");


    })

    /*this.storage.get('usuarioLogin').then((val) => {
      if (val != ' ') {


        if (val != null) {
          console.log('no es nulo');
          console.log(val);
          let newLogin = JSON.parse(val);
          this.login.getLogin(newLogin).subscribe(result => {

            this.datosComercio = result['comercioDB'];

            this.datosComercio.forEach(x => {
              this.proveedoresViewModel = x.proveedores;
            });
            this.proveedores = this.auxiliarServices.removeDuplicates(this.proveedoresViewModel, "_id");


          })

        }
      }
    });*/
    loader.dismiss();

  }
 

  //clic desde vista
  mostrarProductosModal(proveedor: any) {
    //let proveedor= this.proveedoresViewModel.find(x => x.entidad._id === ctxt.entidad._id);

    this.navCtrl.push(ListaProductosModalPage, { data: proveedor });

    //const modal = this.modalCtrl.create(ListaProductosModalPage, { data: proveedor });
    //modal.present();
  }

  //si no tiene proveedores de red, entonces le damos la opcion de cargar su lista
  presentConfirm() {

    Swal({
      title: 'Confirmar',
      text: 'Quieres agregar proveedores a tu red?',
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'no, gracias',
      confirmButtonText: 'Si, listar!',
      confirmButtonColor: '#488aff',
      cancelButtonColor: '#488aff',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.mostrarProveedoresModal();

        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal(
          'Cancelled',
          'Todo Ok, Gracias',
          'error'
        )
        this.navCtrl.setRoot(ConfiguracionInicialPage);
        this.navCtrl.popToRoot();
      }
    })
  }

  mostrarProveedoresModal() {
    const modal = this.modalCtrl.create(ListaProveedoresModalPage);
    modal.present();
  }


  ionViewDidLoad() {
    //this.productosViewModel.length = 0;
  }

  borrarProveedor(index: number) { }

  cargarProveedor(index: number) { }

  doRefresh(refresher?:any) { //"?" in typescript means the parameter is optional

      this.cargarDatosComercio();
      refresher && refresher.complete();//make sure refresher is truthy before calling complete
   
  }
}
