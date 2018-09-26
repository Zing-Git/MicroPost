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
      let montoTotal: number;
      this.pedidos.forEach(x => {
       
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
          montoTotal: x.montoTotal.toString(),  //aqui hermano va a mandar el total
          detallePedido: x.detallePedido
        });

        console.log(this.pedidosViewModel);

      })

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

  async setPedidos() {

  }

  obtenerMontototal(idProveedor: string, idPedido: string) {
    let montoTotal: number;

    return new Promise(function(resolve, reject){
      this.comercioServices.getPedidoAProveedor(this.idComercio).subscribe((result: PedidoComercio[]) => {

        this.pedidos = result['pedidos'];
        let producto: any;

        this.pedidos.forEach(x => {

          if (x._id === idPedido) {

            this.montoTotal = 0;
            x.detallePedido.forEach(detalle => {

              this.productoServices.getProductosDeProveedor(idProveedor).subscribe(result2 => {
                //console.log(detalle.producto);
                producto = result2['productos'].find(p => p._id === detalle.producto);
               // console.log(montoTotal + '  +  ' + producto.precioSugerido);
                if (producto != undefined) {
                  this.montoTotal = this.montoTotal + producto.precioSugerido;
                }

              });
            })

          } else {
            //no hace nada
          }

        })
      })
      resolve(montoTotal);
      reject(0);
    })

  }




}
