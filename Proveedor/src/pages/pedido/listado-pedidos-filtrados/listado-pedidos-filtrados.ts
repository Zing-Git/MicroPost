import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ViewController, App } from 'ionic-angular';
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

  pedidoHabilitado: boolean = true;
  permitirRefresh: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public auxiliar: AuxiliarProvider,
    public proveedorServices: ProveedorProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public appCtrl: App,
    public zone: NgZone) {

    this.obtenerDatosImportantes();

  }

  obtenerDatosImportantes() {
    ENV.PEDIDOS = ' ';
    this.idProveedor = ENV.PROVEEDOR_ID;

    const loader = this.loadingCtrl.create({
      content: "Por favor Espere, cargando pedidos..."

    });
    loader.present();

    this.proveedorServices.getPedidosProveedor(this.idProveedor).subscribe(result => {
      if (result['pedidos_array'] === undefined) {
        
        this.pedidoHabilitado = true;
      } else {
        ENV.PEDIDOS = JSON.stringify(result['pedidos_array']);

        this.cargarCombos();

      }
    })

    loader.dismiss();
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

      this.actualizarPedido(miPedido);

    });
  }

  doRefresh(refresher?:any) { //"?" in typescript means the parameter is optional

      this.obtenerDatosImportantes();
      refresher && refresher.complete();//make sure refresher is truthy before calling complete
   
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

  buscar(index) {
    console.log(this.pedidosAceptados);
    console.log(this.pedidosInformados);
    console.log(this.pedidosRechazados);
    const val = index.target.value;
    //item.comercio.entidad.razonSocial
    if (val && val.trim() != '') {
      if (this.pedidosInformados.length > 0) {
        this.pedidosInformados = this.pedidosInformados.filter((x) => {
          return (x.comercio.entidad.razonSocial.toLowerCase().indexOf(val.toLowerCase()) > -1)
        })
      }
      if (this.pedidosAceptados.length > 0) {
        this.pedidosAceptados = this.pedidosAceptados.filter((x) => {
          return (x.comercio.entidad.razonSocial.toLowerCase().indexOf(val.toLowerCase()) > -1)
        })
      }
      if (this.pedidosRechazados.length > 0) {
        this.pedidosRechazados = this.pedidosRechazados.filter((x) => {
          return (x.comercio.entidad.razonSocial.toLowerCase().indexOf(val.toLowerCase()) > -1)
        })
      }
    } else {

      this.cargarCombos();
    }
  }

  cargarCombos() {

    this.pedidosInformados = new Array();
    this.pedidosAceptados = new Array();
    this.pedidosRechazados = new Array();
    this.pedidosOtros = new Array();
    this.pedidos = new Array();

    this.pedidos = this.auxiliar.crearArray(JSON.parse(ENV.PEDIDOS));
    this.pedidos.forEach(x => {

      if (x.comercio != null) {
        this.pedidoHabilitado = false;
        switch (x.estadoPedido) {
          case "RECHAZADO": {
            
            this.estadoRechazado = false;
            this.pedidosRechazados.push(x);

            break;
          }
          case "PEDIDO SOLICITADO": {
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
