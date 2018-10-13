import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { AuxiliarProvider } from '../../../providers/auxiliar/auxiliar';
import Swal from 'sweetalert2';
import { ProveedorProvider } from '../../../providers/proveedor/proveedor';
import { envirotment as ENV } from '../../../environments/environments';
import { Publicidad } from '../../../modelo/publicidad';
import { ListaPublicidadModalPage } from '../modal/lista-publicidad-modal/lista-publicidad-modal';

@IonicPage()
@Component({
  selector: 'page-lista-publicidad',
  templateUrl: 'lista-publicidad.html',
})
export class ListaPublicidadPage {
  publicidades: any[] = new Array();
  idComercio: string;
  proveedoresViewModel: any[] = new Array();
  proveedores: any[] = new Array();
  vista: any[] = new Array();
  publicidad: Publicidad;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auxiliar: AuxiliarProvider,
    public proveedorService: ProveedorProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.getProveedores();
    /*const loader = this.loadingCtrl.create({
      content: "Por favor Espere unos segundos...",
     duration:2000
    });
    loader.present();
    this.getPublicidades();*/

  }

  getProveedores() {
    this.idComercio = ENV.COMERCIO_ID;
    this.proveedorService.postGetProveedoresDeComercio(this.idComercio).subscribe(resultP => {
      this.auxiliar.getPublcidades().subscribe(resultA => {
        console.log('publicidades');
        console.log(resultA['publicaciones']);
        if (resultA['ok']== true) {
          this.publicidades = resultA['publicaciones'];
          this.proveedoresViewModel = resultP['proveedores'];

          this.publicidades.forEach(x => {
            let publicidad =  {
              tieneImagen: x.tieneImagen,
              disponibilidad: x.disponibilidad,
              fechaAlta: x.fechaAlta,
              _id: x._id,
              proveedor: x.proveedor,
              cuerpo: x.cuerpo,
              fechaInicio: x.fechaInicio,
              titulo: x.titulo,
              fechaFin: x.fechaFin,
              imagen: x.imagen,
              __v: x.__v,
              razonSocial: this.proveedoresViewModel.find(y => x.proveedor === y._id).entidad.razonSocial
            }

            this.vista.push(publicidad);
  
          })
          console.log('proveedores');
          console.log(this.vista);
        } else {
          Swal(
            'Advertencia',
            'Sin Publicidades...',
            'info'
          )
        }
      })
     

    });
  }

  getPublicidades(): void {


    this.auxiliar.load().then(result => {
      console.log(result);
      if (result.ok == true) {
        this.publicidades = result['publicaciones'];

        this.publicidades.forEach(x => {
          this.proveedores.push(this.proveedoresViewModel.find(y => x.proveedor === y._id));

        })
        console.log(this.proveedores);
      } else {
        Swal(
          'Advertencia',
          'Sin Publicidades...',
          'info'
        )
      }

    })
  }

  /* this.proveedorService.load(this.proveedor._id).then(data => {
      this.productosViewModel = data['productos'];

      if (typeof this.productosViewModel === 'undefined') {
        Swal(
          'Advertencia',
          'El proveedor no tiene productos)',
          'error'
        )
      } else {
        this.iniciarArrayCategorias();
      }

    });*/

  mostrarPublicidadModal(item: any): void {
    const modal = this.modalCtrl.create(ListaPublicidadModalPage, { data: item });
    modal.present();
  }
}
