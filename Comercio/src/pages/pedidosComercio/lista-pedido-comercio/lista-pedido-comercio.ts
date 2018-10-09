import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Comercio } from '../../../modelo/comercio';
import { PedidoComercio } from '../../../modelo/pedidoComercio';
import { ComercioProvider } from '../../../providers/comercio/comercio';
import { envirotment as ENV } from '../../../environments/environments';
import { ProductoProvider } from '../../../providers/producto/producto';
import { Storage } from '@ionic/storage';
import { DetallePedidoComercioPage } from '../modal/detalle-pedido-comercio/detalle-pedido-comercio';


@IonicPage()
@Component({
  selector: 'page-lista-pedido-comercio',
  templateUrl: 'lista-pedido-comercio.html',
})
export class ListaPedidoComercioPage {

  clienteViewModel: Comercio = new Comercio();

  pedidosViewModel: any[] = new Array();
  pedidos: any[] = new Array();
  datosComercio: any;
  detallePedido: any[] = new Array();
  proveedores: any[];
  idComercio: string;
  productos: any[];
  montoTotal: number;
  colorEstado: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public comercioServices: ComercioProvider,
    public productoServices: ProductoProvider,
    public storage: Storage,
    public modalCtrl: ModalController) {

    this.idComercio = ENV.COMERCIO_ID;
    this.datosComercio = JSON.parse(ENV.COMERCIO_LOGIN);
    this.obtenerDatosImportantes();
  }

  obtenerDatosImportantes() {

    this.comercioServices.getPedidoAProveedor(this.idComercio).subscribe((result: PedidoComercio[]) => {

      this.pedidos = result['pedidos_array'];
      /*this.pedidos.forEach(x=>{
        if(x.estadoPedido==='RECHAZADO'){
          this.colorEstado = 'danger';
        }else{
          if(x.estadoPedido === 'ACEPTADO'){
            this.colorEstado = 'secondary';
          }else{
            this.colorEstado = 'dark';
          }
        }
      })*/
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

  visualizarDatosPedido(item: any){
   
    const modal = this.modalCtrl.create(DetallePedidoComercioPage, { data: item });
    modal.present();
  }
}
