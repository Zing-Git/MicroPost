import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ViewController, Events, App } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuxiliarProvider } from '../../../providers/auxiliar/auxiliar';
import { ProveedorProvider } from '../../../providers/proveedor/proveedor';
import { envirotment as ENV } from '../../../environments/environment';
import { DetallePedidoProveedorPage } from '../detalle-pedido-proveedor/detalle-pedido-proveedor';
import Swal from 'sweetalert2';
import { ListadoInvitacionPage } from '../../invitacion/listado-invitacion/listado-invitacion';
import { CrearPublicidadPage } from '../../publicidad/crear-publicidad/crear-publicidad';

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

      if (data['pedidos_array'] === undefined) {

        //this.navCtrl.push(CrearPublicidadPage);
        //this.navCtrl.popToRoot();
        loader.dismiss();
        Swal('Atención', 'No posee Pedidos ', 'error')
      } else {
        ENV.PEDIDOS = JSON.stringify(data['pedidos_array']);

        this.cargarCombos();
        loader.dismiss();
      }


    });


  }

  ionViewDidLoad() {

  }
  ionWillEnter() {
    console.log('estoy en ion will enter');
    this.obtenerDatosImportantes();
  }

  /*volver() {
    this.navCtrl.push(ListadoPedidosFiltradosPage);
  }*/

  verDetalle(item: any) {
    const modal = this.modalCtrl.create(DetallePedidoProveedorPage, { data: item });
    modal.present();
    modal.onDidDismiss((miPedido) => {
      this.estadoInformado = true;
      this.estadoAceptado = true;
      this.estadoRechazado = true;
      this.pedidosInformados = new Array();
      this.pedidosAceptados = new Array();
      this.pedidosRechazados = new Array();
      this.pedidosOtros = new Array();
      //this.pedidos = ' ';
      console.log('ACTUALIZANDO INFO');

      this.actualizarPedido(miPedido);

    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      //this.obtenerDatosImportantes();
      refresher.complete();
    }, 2000);
  }

  actualizarPedido(miPedido: any): void {

    this.pedidos.forEach(x => {
      if (x.idPedido === miPedido.idPedido) {
        x.estadoPedido = miPedido.estadoPedido;
      }
    })

    ENV.PEDIDOS = JSON.stringify(this.auxiliar.crearArray(this.pedidos));
    this.cargarCombos();

  }

  cargarCombos() {
    this.pedidos = this.auxiliar.crearArray(JSON.parse(ENV.PEDIDOS));
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
  }

}
