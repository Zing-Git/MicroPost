import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { AuxiliarProvider } from '../../../providers/auxiliar/auxiliar';
import { ProveedorProvider } from '../../../providers/proveedor/proveedor';
import { envirotment as ENV } from '../../../environments/environments';
import { ListaPublicidadModalPage } from '../modal/lista-publicidad-modal/lista-publicidad-modal';
import { NgZone } from '@angular/core';
import { Events } from 'ionic-angular';

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
  publicidad: boolean = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auxiliar: AuxiliarProvider,
    public proveedorService: ProveedorProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public events: Events,
    private zone: NgZone) {


  }

  ionViewDidLoad() {

    const loader = this.loadingCtrl.create({
      content: "Cargando ofertas, espere unos segundos...",
      duration: 3000
    });
    loader.present();
    this.getProveedores();
    //this.getPublicidades();
    //loader.dismiss();
  }

  getProveedores() {
    this.publicidades.length = 0;
    this.proveedoresViewModel.length = 0;
    this.vista.length = 0;
    this.publicidad = true;

    this.idComercio = ENV.COMERCIO_ID;
    this.proveedorService.postGetProveedoresDeComercio(this.idComercio).subscribe(resultP => {
      this.auxiliar.getPublcidades().subscribe(resultA => {
        if (resultA['ok'] == true && resultP['ok'] == true) {
          this.publicidades = resultA['publicaciones'];
          this.proveedoresViewModel = resultP['proveedores'];

          this.publicidad = false;

          this.publicidades.forEach(x => {
            let publicidad = {
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
              razonSocial: x.proveedor.entidad.razonSocial
            }

            this.vista.push(publicidad);

          })
        }
        else {
          this.publicidad = true;
        }
      })
    });

   if(this.vista.length === 0){
     this.publicidad = true;
   }
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
        this.publicidad = false;
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
    //item.razonSocial = this.proveedoresViewModel.find(y => x.proveedor === y._id).entidad.razonSocial
    const modal = this.modalCtrl.create(ListaPublicidadModalPage, { data: item });
    modal.present();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.zone.run(() => {

      this.getProveedores();
      console.log('force update the screen');
    });
    setTimeout(() => {
      console.log('Async operation has ended');

      refresher.complete();
    }, 3000);
  }
}
