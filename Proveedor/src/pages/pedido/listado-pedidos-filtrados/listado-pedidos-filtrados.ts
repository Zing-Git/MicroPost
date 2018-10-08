import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ViewController, Events, App } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuxiliarProvider } from '../../../providers/auxiliar/auxiliar';
import { ProveedorProvider } from '../../../providers/proveedor/proveedor';
import { envirotment as ENV } from '../../../environments/environment';
import { DetallePedidoProveedorPage } from '../detalle-pedido-proveedor/detalle-pedido-proveedor';

@IonicPage()
@Component({
  selector: 'page-listado-pedidos-filtrados',
  templateUrl: 'listado-pedidos-filtrados.html',
})
export class ListadoPedidosFiltradosPage {

  pedido: any;
  inicial: string = 'informado';
  pedidoForm: FormGroup;
  cantidadProductos: number = 0;

  estadoInformado: boolean = true;
  estadoAceptado: boolean = true;
  estadoRechazado: boolean = true;

  pedidos: any;
  idProveedor: string;
  callback: any;

  pedidosInformados: any[] = new Array();
  pedidosAceptados: any[] = new Array();
  pedidosRechazados: any[] = new Array();
  pedidosOtros: any[] = new Array();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public auxiliar: AuxiliarProvider,
    public proveedorServices: ProveedorProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public appCtrl: App) {

      this.obtenerDatosImportantes();

  }

  obtenerDatosImportantes() {

    this.idProveedor = ENV.PROVEEDOR_ID;

    const loader = this.loadingCtrl.create({
      content: "Por favor Espere unos segundos..."

    });
    loader.present();
    this.proveedorServices.load(this.idProveedor).then(data => {
      this.pedidos = data['pedidos_array'];
      this.pedidos.forEach(x => {

        if (x.comercio != null) {

          switch (x.estadoPedido) {
            case "RECHAZADO": {
              this.estadoRechazado = false;
              this.pedidosRechazados.push(x);
              break;
            }
            case "PEDIDO INFORMADO": {
              this.estadoInformado = false;
              this.pedidosInformados.push(x);
              break;
            }
            case "ACEPTADO": {
              this.estadoAceptado = false;
              this.pedidosAceptados.push(x);
              break;
            }
            default: {
              this.pedidosOtros.push(x);
              break;
            }
          }

        }
      })

    });

    loader.dismiss();
  }

  ionViewDidLoad() {
        
  }

  /*volver() {
    this.navCtrl.push(ListadoPedidosFiltradosPage);
  }*/

  verDetalle(item: any) {
    const modal = this.modalCtrl.create(DetallePedidoProveedorPage, { data: item });
    modal.present();
    modal.onDidDismiss(() => {
      this.pedidosInformados = new Array();
      this.pedidosAceptados = new Array();
      this.pedidosRechazados = new Array();
      this.pedidosOtros = new Array();
      this.pedidos = ' ';
      console.log('ACTUALIZANDO INFO');
      this.obtenerDatosImportantes();
      //let refresh: any;
      //this.doRefresh(refresh);
      //this.events.publish('updateScreen');     
     
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
