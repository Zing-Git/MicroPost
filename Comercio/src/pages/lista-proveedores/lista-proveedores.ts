import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Proveedor } from '../../modelo/proveedor';
import { ProveedorProvider } from '../../providers/proveedor/proveedor';
import { ListaProveedoresModalPage } from '../lista-proveedores/modal/lista-proveedores-modal/lista-proveedores-modal';
import Swal from 'sweetalert2';
import { ListaProductosModalPage } from '../lista-proveedores/modal/lista-productos-modal/lista-productos-modal';
import { Storage } from '@ionic/storage';
import { ConfiguracionInicialPage } from '../configuracion-inicial/configuracion-inicial';

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
    public storage: Storage) {

    this.proveedoresViewModel = new Array();

    this.storage.get('comercio').then((val) => {
      if (val != null && val != undefined) {
        this.datosComercio = JSON.parse(val);
  
        this.cargarListaDeProveedores();
      }
    })

  }

  //obtiene los proveedores que pertenecena al comercio
  cargarListaDeProveedores() {
    this.datosComercio.forEach(x => {
      this.proveedoresViewModel = x.proveedores;
    });
  }

  //clic desde vista
  mostrarProductosModal(proveedor: any) {

    const modal = this.modalCtrl.create(ListaProductosModalPage, { data: proveedor });
    modal.present();
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
      }
    })
  }

  mostrarProveedoresModal() {
    const modal = this.modalCtrl.create(ListaProveedoresModalPage);
    modal.present();
  }

  
  ionViewDidLoad() {  }

  borrarProveedor(index: number) {  }

  cargarProveedor(index: number) {  }
}
