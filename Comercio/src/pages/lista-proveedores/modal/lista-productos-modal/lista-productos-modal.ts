import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, IonicPage, LoadingController } from 'ionic-angular';
import { ProveedorProvider } from '../../../../providers/proveedor/proveedor';
import Swal from 'sweetalert2';
import { PedidoModalPage } from '../pedido-modal/pedido-modal';
import { Pedido } from '../../../../modelo/pedido';
import { envirotment as ENV } from '../../../../environments/environments';
import { Storage } from '@ionic/storage';
import { CarritoPage } from '../carrito/carrito';
import { ListaProveedoresPage } from '../../lista-proveedores';
import { AuxiliarProvider } from '../../../../providers/auxiliar/auxiliar';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lista-productos-modal',
  templateUrl: 'lista-productos-modal.html',
})
export class ListaProductosModalPage {

  isEnabledSubCategoria: boolean = false;
  isEnabledCategoria: boolean = true;
  productosViewModel: any[];
  proveedor: any;
  proveedorNombre: string;
  productoCategorias: any[] = new Array();
  categoria: string;
  subcategoria: string;
  productoSubCategorias: any[] = new Array();
  arrayCategorias: any[] = new Array();
  arraySubcategorias: any[] = new Array();
  showListProducto: boolean = false;
  arrayProductos: any[] = new Array();
  tipoEntrega: any;

  itemSubcategoriaSelected: any;

  
  pedido: Pedido;
  productosPedidos: any[] = new Array();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private proveedorService: ProveedorProvider,
    private modalCtrl: ModalController,
    private storage: Storage,
    private auxiliar: AuxiliarProvider,
    private loadingCtrl: LoadingController,
    public events: Events) {

    const loader = this.loadingCtrl.create({
      content: "Por favor Espere unos segundos...",
      duration: 3000
    });
    loader.present();

    this.proveedor = navParams.get('data');
    this.pedido = new Pedido();

    this.cargarListaProductos();

  }

  cargarListaProductos() {

    this.isEnabledSubCategoria = false;
    this.showListProducto = false;


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


    this.proveedorService.postGetProductosPorIdProveedor(this.proveedor._id).subscribe(result => {
      this.productosViewModel = result['productos'];
      if (typeof this.productosViewModel === 'undefined') {
        Swal(
          'Advertencia',
          'El proveedor no tiene productos)',
          'error'
        )
      } else {
        this.iniciarArrayCategorias();
      }
    });


  }

  iniciarArrayCategorias() {


    this.productoCategorias = new Array();
    this.arrayCategorias.length = 0;

    if (typeof this.productosViewModel != 'undefined') {

      this.productosViewModel.forEach(x => {
        this.productoCategorias.push(x.categoria);
      });
      this.arrayCategorias = this.auxiliar.crearArray(this.productoCategorias);
      this.arraySubcategorias.length = 0;
      this.arrayProductos.length = 0;

    }

    ENV.PEDIDO = JSON.stringify(this.productosPedidos);  //aqui esta en blanco

  }



  volver() {
    this.navCtrl.setRoot(ListaProveedoresPage);
  }

  onCategoriasChange(ctxt: string): void {
    this.productoSubCategorias.length = 0;

    this.isEnabledSubCategoria = true;
    this.categoria = '';
    this.categoria = ctxt;
    this.productosViewModel.forEach(x => {
      if (x.categoria === ctxt) {
        this.productoSubCategorias.push(x.subcategoria);
      }
    });
    this.arraySubcategorias = this.auxiliar.crearArray(this.productoSubCategorias);
    this.itemSubcategoriaSelected = this.arraySubcategorias[0] || 1;
  }

  onSubCategoriasChange(ctxt: string): void {
    this.showListProducto = true;
    this.arrayProductos.length = 0;

    this.productosViewModel.forEach(x => {
      if (x.subcategoria === ctxt && x.categoria === this.categoria) {
        this.arrayProductos.push(x);
      }
    });
    this.categoria = ' ';
  }

  seleccionarProducto(producto: any) {

    let nuevoProducto: any;
    let modal = this.modalCtrl.create(PedidoModalPage, { data: producto });

    modal.present();

    modal.onDidDismiss((location) => {
      //cargar en envirotment el listado de pedidos

      if (location.cantidad > 0) {

        this.productosPedidos = JSON.parse(ENV.PEDIDO);   //primero obtengo lista de productos

        nuevoProducto = location;                         //segundo agrego el nuevo producto
        this.productosPedidos.push({
          _id: nuevoProducto._id,
          unidadMedida: nuevoProducto.unidadMedida,
          cantidad: nuevoProducto.cantidad,
          nombreProducto: nuevoProducto.nombreProducto
        })

        ENV.PEDIDO = JSON.stringify(this.productosPedidos);   //tercero aqui almaceno la lista de productos
        //console.log('Productos Pedidos');
        //console.log(this.productosPedidos);
      }

    });

    this.cargarListaProductos();

  }

  buscarCateSubCat(index) {
    this.isEnabledCategoria = false;
    this.isEnabledSubCategoria = false;
    this.showListProducto = true;
    const val = index.target.value;

    if (val && val.trim() != '') {

      this.arrayProductos = this.productosViewModel.filter((x) => {
        return (x.nombreProducto.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });

    }
  }

  pedirProducto() {     //Visualizar en un modal el carrito

    this.storage.get('token').then((val) => {
      this.pedido.token = val
    });
    this.storage.get('idComercio').then((val) => {
      this.pedido.comercio = val
    });
    this.pedido.proveedor = this.proveedor._id;
    this.tipoEntrega = ' ';
    if (typeof this.proveedor.tipoEntrega != 'undefined') {
      this.proveedor.tiposEntrega.forEach(x => {
        this.tipoEntrega = this.tipoEntrega + ', ' + x;
      })
    }

    this.pedido.tipoEntrega = this.tipoEntrega;
    this.pedido.comentario = 'Pedido realizado';
    this.pedido.productos = this.productosPedidos;

    //console.log(this.pedido);
    //TODO Aqui debo llamar al servicio y realizar algun otro control para no enviar vacio

    this.enviarPedido();
    //this.mostrarCarrito();
  }

  enviarPedido() {

    //this.storage.set('pedido', JSON.stringify(this.pedido));   //almaceno el pedido
    if (this.pedido != null) {
      //ENV.CARRITO = JSON.stringify(this.pedido);
      //this.viewCtrl.dismiss();
      let modal = this.modalCtrl.create(CarritoPage, { data: this.pedido });
      modal.present();

      modal.onDidDismiss((location) => {

        if (location != null) {
          this.pedido = location;
        } else {
          //this.events.publish('reloadPage1');

          this.navCtrl.setRoot(ListaProveedoresPage);
          this.navCtrl.popToRoot();

        }

      });
    }


    // modal.onDidDismiss((location) => {});
  }

  ionViewDidLoad() { }


}
