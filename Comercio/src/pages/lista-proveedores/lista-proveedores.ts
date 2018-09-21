import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Proveedor } from '../../modelo/proveedor';
import { ProveedorProvider } from '../../providers/proveedor/proveedor';
import { ListaProveedoresModalPage } from '../lista-proveedores/modal/lista-proveedores-modal/lista-proveedores-modal';
import Swal from 'sweetalert2';
import { ListaProductosModalPage } from '../lista-proveedores/modal/lista-productos-modal/lista-productos-modal';

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
    private proveedorService: ProveedorProvider,
    public modalCtrl: ModalController) {
    this.proveedoresViewModel = new Array();

    this.datosComercio = navParams.get('data');
    this.cargarListaDeProveedores();

  }

  ionViewDidLoad() {
    //this.cargarProveedoresDeRed();

  }

  cargarListaDeProveedores() {
    if (typeof this.datosComercio === 'undefined') {
      this.productosViewModel = new Array();
    } else {
      this.datosComercio.forEach(x => {
        this.proveedoresViewModel = x.proveedores;

      });
    }

  }

  //por si solo no deberia funcionar
  cargarProveedoresDeRed() {
    this.proveedorService.postGetProveedorDeRed().subscribe(result => {
      this.proveedoresViewModel = result;
    });

  }

  mostrarProductosModal(proveedor: any) {
    console.log('id del proveedor');
    console.log(proveedor._id);

    const modal = this.modalCtrl.create(ListaProductosModalPage, { data: proveedor });
    modal.present();
  }

  borrarProveedor(index: number) {

  }



  cargarProveedor(index: number) {

  }

  mostrarProveedoresModal() {

    const modal = this.modalCtrl.create(ListaProveedoresModalPage);
    modal.present();

  }

  //si no tiene proveedores de red, entonces le damos la opcion de cargar su lista
  presentConfirm() {
    /* no se borra porque no se sabe si sweet alert2 funciona en iOs.
    let alert = this.alertCtrl.create({
      title: 'Confirmar ',
      message: 'Quieres agregar proveedores?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.mostrarProveedores();
          }
        }
      ]
    });
    alert.present();*/

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
        //Swal(
        //  'Deleted!',
        //  'Your imaginary file has been deleted.',
        //  'success'
        //)
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

}
