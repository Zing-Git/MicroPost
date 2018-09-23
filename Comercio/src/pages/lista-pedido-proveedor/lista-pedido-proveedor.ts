import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Comercio } from '../../modelo/comercio';
import { ComercioProvider } from '../../providers/comercio/comercio';
import { envirotment as ENV } from '../../environments/environments';
import Swal from 'sweetalert2';
import { ProveedorProvider } from '../../providers/proveedor/proveedor';
import { ProductoProvider } from '../../providers/producto/producto';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-lista-pedido-proveedor',
  templateUrl: 'lista-pedido-proveedor.html',
})
export class ListaPedidoProveedorPage {

  clienteViewModel: Comercio = new Comercio();

  pedidosViewModel: any[]  = new Array();
  pedidos: any[] = new Array();
  datosComercio: any;

  proveedores: any[];
  idComercio: string;
  productos: any[];
  montoTotal: number;

  //test
  toggle01: boolean = true;
  toggle02: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public comercioServices: ComercioProvider,
    public proveedorServices: ProveedorProvider,
    public productoServices: ProductoProvider) {
     
      this.obtenerDatosImportantes();
      this.prepararVistaPedido();
  }

  obtenerDatosImportantes() {

    //idComercio
    this.idComercio = ENV.COMERCIO;

    //pedidos
    this.comercioServices.getPedidoAProveedor(this.idComercio).subscribe(result => {

      let mipedidos: any[];
      if (typeof result !== 'undefined') {

        mipedidos = result['pedidos'];
        this.pedidos = this.crearArray(mipedidos);

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

  toggleOne() {
    this.toggle01 = !this.toggle02;
  }

  toggleTwo() {
    this.toggle02 = !this.toggle01;
  }

  ionViewDidLoad() { 
    //this.prepararVistaPedido();
    //this.prepararVistaPedido();
  }

  onPedidoChange(index: string) { }

  prepararVistaPedido() {
    console.log(this.pedidos);
    this.pedidos.forEach(x => {
      console.log('dentro del arreglo');
      console.log(x);
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

    })
    console.log(this.pedidosViewModel);
  }

  obtenerNombreDeProveedor(idEntidad: string): string {

    let razonSocial: '';
    this.datosComercio.forEach(x => {
      razonSocial = x.entidad.razonSocial;
    })

    return razonSocial;
  }

  obtenerProductosDeProveedor(idProveedor: string) {

    this.productos = new Array();
    this.productoServices.getProductosDeProveedor(idProveedor).subscribe(result => {
      if (typeof result != 'undefined') {
        this.productos = result;
      }
    })

    console.log(this.productos);
  }

  obtenerMontoTotalDeProveedor(idProveedor: string) {
    this.montoTotal = 0;

    this.pedidosViewModel.forEach(x => {
      if (x.proveedor._id === idProveedor) {
        x.detallePedido.forEach(y => {
          this.montoTotal += this.productos.find(x => x._id === y._id).precioSugerido;
        })
      }

    })
  }

  crearArray(arreglo: string[]): any[] {

    let clon: any[] = JSON.parse(JSON.stringify(arreglo));
    let nuevoArreglo = Array.from(new Set(clon.map((item: any) => item)))

    return nuevoArreglo;
  }
}
