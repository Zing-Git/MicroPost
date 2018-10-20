import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { Proveedor } from '../../modelo/proveedor';
import { ListaProveedoresModalPage } from '../lista-proveedores/modal/lista-proveedores-modal/lista-proveedores-modal';
import Swal from 'sweetalert2';
import { ListaProductosModalPage } from '../lista-proveedores/modal/lista-productos-modal/lista-productos-modal';
import { Storage } from '@ionic/storage';
import { ConfiguracionInicialPage } from '../configuracion-inicial/configuracion-inicial';
import { envirotment as ENV } from '../../environments/environments';

@IonicPage()
@Component({
  selector: 'page-lista-proveedores',
  templateUrl: 'lista-proveedores.html',
})
export class ListaProveedoresPage {
  proveedoresViewModel: Proveedor[] = [];
  datosComercio: any[];
  productosViewModel: any[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public events: Events) {

     
    this.proveedoresViewModel = new Array();
    
    this.datosComercio = JSON.parse(ENV.COMERCIO_LOGIN);
    this.cargarListaDeProveedores();


  }

  //obtiene los proveedores que pertenecena al comercio
  cargarListaDeProveedores() {
    this.datosComercio.forEach(x => {
      this.proveedoresViewModel = x.proveedores;
    });

    /*if(this.productosViewModel.length === 0){
      this.presentConfirm();
    }*/
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
      confirmButtonText: 'Si, listar!',
      cancelButtonText: 'no, gracias'
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

  borrarProveedor(index: number) {  }

  cargarProveedor(index: number) {  }

}
