import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProveedorProvider } from '../../../../providers/proveedor/proveedor';
import { Storage } from '@ionic/storage';
import Swal from 'sweetalert2';

@IonicPage()
@Component({
  selector: 'page-lista-proveedores-modal',
  templateUrl: 'lista-proveedores-modal.html',
})
export class ListaProveedoresModalPage {

  proveedoresViewModel: any[];
  proveedores: any[];
  idComercio: string;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private proveedorService: ProveedorProvider,
              private storage: Storage ) {
                this.proveedoresViewModel = new Array();
               
  }

  ionViewDidLoad() {
    this.cargarInicial();
  }

  cargarInicial() {
    this.proveedorService.postGetProveedores().subscribe(result => {
      this.proveedoresViewModel = result['proveedorDB'];
      
    });

    this.storage.get('idComercio').then((val) => {
      this.idComercio = val;
    });


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
    
    if(typeof text === 'undefined'){
      text : 'Podrias unirte a mi red de proveedores?. Gracias.';
    }

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
