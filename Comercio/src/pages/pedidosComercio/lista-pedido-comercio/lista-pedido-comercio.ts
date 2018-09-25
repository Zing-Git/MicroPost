import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Comercio } from '../../../modelo/comercio';
import { PedidoComercio } from '../../../modelo/pedidoComercio';
import { ComercioProvider } from '../../../providers/comercio/comercio';
import { envirotment as ENV } from '../../../environments/environments';
import Swal from 'sweetalert2';
import { ProductoProvider } from '../../../providers/producto/producto';
import { Storage } from '@ionic/storage';


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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public comercioServices: ComercioProvider,
    public productoServices: ProductoProvider,
    public storage: Storage) {

    this.idComercio = ENV.COMERCIO;
    this.datosComercio = JSON.parse(ENV.COMERCIO_LOGIN);

    this.obtenerDatosImportantes();
  }


  obtenerDatosImportantes() {

    //idComercio


    //pedidos
    this.comercioServices.getPedidoAProveedor(this.idComercio).subscribe((result: PedidoComercio[]) => {

      this.pedidos = result['pedidos'];

      
      let productos: any[];
      let producto: any;
      let montoTotal: string = '0';
      this.pedidos.forEach(x => {

        this.storage.ready().then(() => {
          this.storage.set('pedidos', JSON.stringify(x.detallePedido));
        });
        

        this.obtenerMontototalDePedido(x.proveedor._id);
        this.storage.get('montoTotal').then(
          val => montoTotal = val
        )

        this.pedidosViewModel.push({
          activo: x.activo,
          idPedido: x._id,
          proveedor: {
            _id: x.proveedor._id,
            entidad: x.proveedor.entidad,//,
            nombre: this.obtenerNombreRazonSocial(x.proveedor.entidad)
          },
          comercio: x.comercio,
          tipoEntrega: x.tipoEntrega,
          fechaEntrega: x.fechaEntrega,
          estadoPedido: x.estadoPedido,
          estadoTerminal: x.estadoTerminal,
          comentario: x.comentario,
          fechaAlta: x.fechaAlta,
          productos: this.productos,
          montoTotal: montoTotal.toString(),
          detallePedido: x.detallePedido
        });

      })
      console.log(this.pedidosViewModel);
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

  obtenerMontototalDePedido(idProveedor: string) {

    let productos = new Array();
    let pedidos: any = new Array();
    let montoTotal: number = 0;

    this.productoServices.getProductosDeProveedor(idProveedor).subscribe(result => {

      console.log('en el detalle pedido')
      console.log('productos')
      productos = result['productos'];
      console.log(productos);
      this.getPedidos();
      console.log('detalle del pedido');
      console.log(this.detallePedido);
      this.detallePedido.forEach(x => {
        let pedido = productos.find(prod => prod._id === x.producto);
        montoTotal = montoTotal + pedido.precioSugerido
      })

      console.log('el monto total')
      console.log(montoTotal)
      this.storage.set('montoTotal', montoTotal);
      /* this.storage.get('comercio').then((val) => {
      if (val != null && val != undefined) {
        this.datosComercio = JSON.parse(val);
  
        this.cargarListaDeProveedores();
      }
    }) */

    })
    return productos;

  }

  async getPedidos(){

    await this.storage.get('pedidos').then(
      val => this.detallePedido = JSON.parse(val)
    );
  }

  async setPedidos(){

  }
}
