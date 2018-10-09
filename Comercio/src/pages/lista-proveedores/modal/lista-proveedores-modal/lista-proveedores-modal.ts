import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProveedorProvider } from '../../../../providers/proveedor/proveedor';
import { envirotment as ENV } from '../../../../environments/environments';
import Swal from 'sweetalert2';

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
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private proveedorService: ProveedorProvider) {


  }

  ionViewDidLoad() {
    this.cargarInicial();

  }

  cargarInicial() {
    this.idComercio = ENV.COMERCIO_ID;
    this.proveedorService.postGetProveedoresDeComercio(this.idComercio).subscribe(result => {
      this.proveedoresViewModel = result['proveedores'];

    });



  }

   async cargarProveedor(proveedor: any) {
    console.log(proveedor._id);

    const {value: text} = await Swal({
      title: 'Ingrese Peticion',
      input: 'textarea',
      inputPlaceholder: 'Enviar mensaje al proveedor...',
      showCancelButton: true
    });
    this.text = text;
    
    this.realizarPeticion(proveedor);
    

  }

  realizarPeticion(proveedor: any){
    

    this.proveedorService.postEnviarInvitacion(proveedor._id, this.idComercio, this.text).subscribe(result => {
      if (result.ok === true) {
        Swal(
          'Peticion Enviada!',
          'Se envio una invitacion al Proveedor ' + proveedor.entidad.razonSocial,
          'success'
        );
        this.navCtrl.setRoot(ListaProveedoresModalPage);
          this.navCtrl.popToRoot();
      } else {
        Swal(
          'Error!',
          'Se produjo un error al enviar la peticion ',
          'error'
        );
      }
    });
  }

}
