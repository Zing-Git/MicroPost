import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Comercio } from '../../../modelo/comercio';
import { PedidoComercio } from '../../../modelo/pedidoComercio';
import { ComercioProvider } from '../../../providers/comercio/comercio';
import { envirotment as ENV } from '../../../environments/environments';
import Swal from 'sweetalert2';


@IonicPage()
@Component({
  selector: 'page-lista-pedido-comercio',
  templateUrl: 'lista-pedido-comercio.html',
})
export class ListaPedidoComercioPage {

  clienteViewModel: Comercio = new Comercio();

  pedidosViewModel: any[]  = new Array();
  pedidos:  any[] = new Array();
  datosComercio: any;

  proveedores: any[];
  idComercio: string;
  productos: any[];
  montoTotal: number;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public comercioServices: ComercioProvider) {
      //this.pedidos = new Array();

      
      //this.prepararVistaPedido();

  }

  ionViewDidLoad() {
    this.obtenerDatosImportantes();
    
  }

  obtenerDatosImportantes() {

    //idComercio
    this.idComercio = ENV.COMERCIO;

    //pedidos
    this.comercioServices.getPedidoAProveedor(this.idComercio).subscribe((result: PedidoComercio[]) => {

      if (typeof result !== 'undefined') {
        
        this.pedidos = result['pedidos'];
        console.log(this.pedidos);

      } else {
        Swal(
          'Error!',
          'No hay Pedidos de Proveedores',
          'warning'
        );
      }
    })

    this.datosComercio = JSON.parse(ENV.COMERCIO_LOGIN);
  }

  prepararVistaPedido() {
    console.log(this.pedidos);
    console.log(this.idComercio);
    console.log(this.datosComercio);
    this.pedidos.forEach(element => {
      console.log(element);
    });
    /*this.pedidos.forEach(x => {
      console.log('dentro del arreglo');
      console.log(x.comercio);
      //this.obtenerProductosDeProveedor(x.proveedor._id);  //cargo this.Productos
      //this.obtenerMontoTotalDeProveedor(x.proveedor._id);

      this.pedidosViewModel.push({
        activo: x.activo,
        idPedido: x._id,
        proveedor: {
          _id: x.proveedor._id,
          entidad: x.proveedor.entidad//,
          //nombre: this.obtenerNombreDeProveedor(x.proveedor.entidad)
        },
        comercio: x.comercio,
        tipoEntrega: x.tipoEntrega,
        fechaEntrega: x.fechaEntrega,
        estadoPedido: x.estadoPedido,
        estadoTerminal: x.estadoTerminal,
        comentario: x.comentario,
        fechaAlta: x.fechaAlta,
        productos: this.productos,
        montoTotal: this.montoTotal,
        detallePedido: x.detallePedido
      });
 console.log(this.pedidosViewModel);
    })*/
   
  }
}
