import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProveedorProvider } from '../../providers/proveedor/proveedor';
import Swal from 'sweetalert2';

@IonicPage()
@Component({
  selector: 'page-lista-proveedores-modal',
  templateUrl: 'lista-proveedores-modal.html',
})
export class ListaProveedoresModalPage {

  proveedoresViewModel: any[];
  proveedores: any[];
  clienteViewModel: any[];
  clienteId: string;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private proveedorService: ProveedorProvider ) {
                this.proveedoresViewModel = new Array();

                this.clienteViewModel = navParams.get('data');
                this.clienteViewModel.forEach(x=>{
                  this.clienteId = x._id;
                })
  }

  ionViewDidLoad() {
    this.cargarProveedores();
  }

  cargarProveedores() {
    this.proveedorService.postGetProveedores().subscribe(result => {
      this.proveedoresViewModel = result['proveedorDB'];
      
    });

  }

  cargarProveedor(proveedor: any){
    console.log(proveedor._id);
    let peticion:{
      comercio: string,
      proveedor: string,
      text: string
    }
    peticion.proveedor = proveedor._id;
    peticion.comercio= this.clienteId;
    peticion.text = 'Ejemplo de carga';

    this.proveedorService.postEnviarInvitacion(peticion).subscribe(result =>{
      if(result.ok === true){
        Swal(
          'Peticion Enviada!',
          'Se envio una invitacion al Proveedor ' + proveedor.entidad.razonSocial,
          'success'
        );
      }else{
        Swal(
          'Error!',
          'Se produjo un error al enviar la peticion ',
          'error'
        );
      }
    })
   
  }

}
