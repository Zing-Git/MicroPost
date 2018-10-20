import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { ProveedorProvider } from '../../../../providers/proveedor/proveedor';
import { envirotment as ENV } from '../../../../environments/environments';
import Swal from 'sweetalert2';
import { InvitacionProveedorModalPage } from '../invitacion-proveedor-modal/invitacion-proveedor-modal';

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
    private proveedorService: ProveedorProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController) {


  }

  ionViewDidLoad() {
    
    this.cargarInicial();

  }

  cargarInicial() {
    const loader = this.loadingCtrl.create({
      content: "Cargando Proveedores, espere unos segundos..."
    });
    loader.present();
    this.idComercio = ENV.COMERCIO_ID;
    this.proveedorService.postGetProveedoresDeComercio(this.idComercio).subscribe(result => {
      this.proveedores = result['proveedores'];
     /* this.proveedores.forEach(x=>{
        this.proveedorService.getEstadoProveedor(x._id).subscribe(data =>{
          let invitaciones = data['invitaciones'];
          invitaciones.forEach(y =>{
            if(this.idComercio === y.comercio._id){
              this.proveedoresViewModel.push(x);
            }
          })
        } )
      })*/
    });
    loader.dismiss();
    console.log(this.proveedoresViewModel);
  }

  /*async cargarProveedor(proveedor: any) {
   console.log(proveedor._id);

   const {value: text} = await Swal({
     title: 'Ingrese Peticion',
     input: 'textarea',
     inputPlaceholder: 'Enviar mensaje al proveedor...',
     showCancelButton: true,     
     confirmButtonText: 'Si, ENVIAR!',
     confirmButtonColor: '#063079',
     cancelButtonColor: '#f53d3d',
     cancelButtonText: 'Cancelar'
   });
   this.text = text;
   
   this.realizarPeticion(proveedor);
   
 }*/

  realizarInvitacion(proveedor: any){
    const modal = this.modalCtrl.create(InvitacionProveedorModalPage, { data: proveedor });
    modal.present();
  }
  cargarProveedor(proveedor: any) {
    Swal({
      title:'Paso 2 de 2: Confirme el proveedor ' ,
      text: proveedor.entidad.razonSocial + ' le permitirá adquirir productos del rubro: ' + proveedor.entidad.actividadPrincipal,
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, ENVIAR!',
      confirmButtonColor: '#063079',
      cancelButtonColor: '#f53d3d',
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

          title: 'Paso 3 de 3: Felicidades ya cumpliste!',
          text: 'Debes esperar a que el proveedor te agregue a la red de comercios. Te informaremos cuando eso ocurra.',
          type: 'success',
          showCancelButton: false,
          confirmButtonText: 'Si, Aceptar!',
          confirmButtonColor: '#063079',         
        })

        this.navCtrl.setRoot(ListaProveedoresModalPage);
        this.navCtrl.popToRoot();
        loader.dismiss();
      } else {
        loader.dismiss();
        Swal(
          'Error!',
          'Se produjo un error al enviar la peticion ',
          'error'
        );
      }
    });
  }

}
