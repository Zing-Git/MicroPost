import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Comercio } from '../../../modelo/comercio';
import { PedidoComercio } from '../../../modelo/pedidoComercio';
import { ComercioProvider } from '../../../providers/comercio/comercio';
import { envirotment as ENV } from '../../../environments/environments';
import { ProductoProvider } from '../../../providers/producto/producto';
import { Storage } from '@ionic/storage';
import { DetallePedidoComercioPage } from '../modal/detalle-pedido-comercio/detalle-pedido-comercio';
import { AuxiliarProvider } from '../../../providers/auxiliar/auxiliar';


@IonicPage()
@Component({
  selector: 'page-lista-pedido-comercio',
  templateUrl: 'lista-pedido-comercio.html',
})
export class ListaPedidoComercioPage {
  nombreComercio: string = ENV.NOMBRE_COMERCIO;
  rubroComercio: string = ENV.RUBRO_COMERCIO;

  clienteViewModel: Comercio = new Comercio();

  pedidosViewModel: any[] = new Array();

  datosComercio: any;
  detallePedido: any[] = new Array();
  proveedores: any[];
  idComercio: string;
  productos: any[];
  montoTotal: number;
  colorEstado: any;

  //  aqui inician las variables que vamos a usar
  inicial: string = 'solicitado';
  estadoAceptado: boolean = true;
  estadoRechazado: boolean = true;
  estadoSolicitado: boolean = true;
  estado: boolean = false;

  pedidos: any[] = new Array();
  pedidosAceptados: any[] = new Array();
  pedidosRechazados: any[] = new Array();
  pedidosSolicitados: any[] = new Array();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public comercioServices: ComercioProvider,
    public productoServices: ProductoProvider,
    public storage: Storage,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public auxiliar: AuxiliarProvider) {

    const loader = this.loadingCtrl.create({
      content: "Cargando pedidos, espere unos segundos...",
      duration: 2000
    });
    loader.present();

    this.obtenerDatosImportantes();
  }

  obtenerDatosImportantes() {


    this.idComercio = ENV.COMERCIO_ID;
    this.datosComercio = JSON.parse(ENV.COMERCIO_LOGIN);
    this.comercioServices.getPedidoAProveedor(this.idComercio).subscribe((result: PedidoComercio[]) => {
console.log(result['pedidos_array']);
      if(result['pedidos_array'] != undefined){
        this.estado = true;
        ENV.PEDIDOS = JSON.stringify(result['pedidos_array']);
      this.cargarCombos();
      }else{
        this.estado = false;
      }
      
    })
  }

  obtenerNombreRazonSocial(idProveedor: string): string {
    let razonSocial: string = '';
    this.datosComercio.forEach(x => {
      if (idProveedor === x.entidad._id) {
        razonSocial = x.entidad.razonSocial;
      }
    })
    return razonSocial;
  }

  async getPedidos() {

    await this.storage.get('pedidos').then(
      val => this.detallePedido = JSON.parse(val)
    );
  }

  visualizarDatosPedido(item: any) {

    const modal = this.modalCtrl.create(DetallePedidoComercioPage, { data: item });
    modal.present();
  }

  cargarCombos() {
    this.pedidosAceptados = new Array();
    this.pedidosRechazados = new Array();
    this.pedidosSolicitados = new Array();

    this.estadoAceptado = true;
    this.estadoSolicitado = true;
    this.estadoRechazado = true;

    this.pedidos = this.auxiliar.crearArray(JSON.parse(ENV.PEDIDOS));
    console.log(this.pedidos);
    this.pedidos.forEach(x => {

      switch (x.estadoPedido) {
        case "RECHAZADO": {
         
          this.estadoRechazado = false;
          this.pedidosRechazados.push(x);
         
          break;
        }
        case "PEDIDO SOLICITADO": {
         
          this.estadoSolicitado = false;
          this.pedidosSolicitados.push(x);
          
          break;
        }
        case "ACEPTADO": {
         
          this.estadoAceptado = false;
          this.pedidosAceptados.push(x);
         
          break;
        }
        default: {
          //this.pedidosOtros.push(x);
          break;
        }
      }

    })
  }
}
