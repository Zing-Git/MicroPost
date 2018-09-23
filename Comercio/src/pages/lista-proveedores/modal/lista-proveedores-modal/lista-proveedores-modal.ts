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
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private proveedorService: ProveedorProvider) {
              
               
  }

  ionViewDidLoad() {
    this.cargarInicial();
    console.log(this.proveedoresViewModel);
  }

  cargarInicial() {
    this.proveedorService.postGetProveedorDeRed().subscribe(result => {
      this.proveedoresViewModel = result['proveedores'];
      
    });

    this.idComercio = ENV.COMERCIO;

  }

  async cargarProveedor(proveedor: any){
    console.log(proveedor._id);

    let peticion:{
      comercio: string,
      proveedor: string,
      text: string
    }
   

    var {value: text} = await Swal({
      input: 'textarea',
      inputPlaceholder: 'Enviar mensaje al proveedor...',
      showCancelButton: true
    })
    
    /*if(typeof text === 'undefined'){
      text : 'Podrias unirte a mi red de proveedores?. Gracias.';
    }*/

    peticion.proveedor = proveedor._id;
    peticion.comercio= this.idComercio;
    peticion.text = text;

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
    });
   
  }

}
