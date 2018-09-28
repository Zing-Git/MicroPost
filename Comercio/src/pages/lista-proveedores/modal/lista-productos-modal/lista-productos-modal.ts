import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { ProveedorProvider } from '../../../../providers/proveedor/proveedor';
import Swal from 'sweetalert2';
import { PedidoModalPage } from '../pedido-modal/pedido-modal';
import { Pedido } from '../../../../modelo/pedido';

import { Storage } from '@ionic/storage';
import { CarritoPage } from '../carrito/carrito';

@Component({
  selector: 'page-lista-productos-modal',
  templateUrl: 'lista-productos-modal.html',
})
export class ListaProductosModalPage {

  isenabled: boolean = false;
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

  pedido: Pedido;
  productosPedidos: any[] = new Array();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private proveedorService: ProveedorProvider,
    private modalCtrl: ModalController,
    private storage: Storage) {

    this.proveedor = navParams.get('data');

    this.storage.get('pedido').then((val) => {
      if (val != null && val != undefined) {
        this.pedido = JSON.parse(val);
      } else {
        this.pedido = new Pedido();
      }
    })
    this.cargarListaProductos();
  }

  cargarListaProductos() {
    this.isenabled = false;
    this.showListProducto = false;

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

    if (typeof this.productosViewModel != 'undefined') {
      this.productosViewModel.forEach(x => {
        this.productoCategorias.push(x.categoria);
      });
      this.arrayCategorias = this.crearArray(this.productoCategorias);
      this.arraySubcategorias.length = 0;
      this.arrayProductos.length = 0;
    }

  }

  crearArray(arreglo: string[]): any[] {

    let clon: any[] = JSON.parse(JSON.stringify(arreglo));
    let nuevoArreglo = Array.from(new Set(clon.map((item: any) => item)))

    return nuevoArreglo;
  }

  volver() {
    this.navCtrl.pop();
  }

  onCategoriasChange(ctxt: string): void {
    this.productoSubCategorias.length = 0;

    this.isenabled = true;
    this.categoria = '';
    this.categoria = ctxt;
    this.productosViewModel.forEach(x => {
      if (x.categoria === ctxt) {
        this.productoSubCategorias.push(x.subcategoria);
      }
    });
    this.arraySubcategorias = this.crearArray(this.productoSubCategorias);
  }

  onSubCategoriasChange(ctxt: string): void {
    this.showListProducto = true;
    this.arrayProductos.length = 0;

    this.productosViewModel.forEach(x => {
      if (x.subcategoria === ctxt && x.categoria === this.categoria) {
        this.arrayProductos.push(x);
      }
    });

  }

  seleccionarProducto(producto: any) {

    let nuevoProducto: any;
    let modal = this.modalCtrl.create(PedidoModalPage, { data: producto });

    modal.present();

    modal.onDidDismiss((location) => {

      nuevoProducto = location;
      this.productosPedidos.push({
        _id: nuevoProducto._id,
        unidadMedida: nuevoProducto.unidadMedida,
        cantidad: nuevoProducto.cantidad,
        nombreProducto: nuevoProducto.nombreProducto
      })

      console.log('Productos Pedidos');
      console.log(this.productosPedidos);
    });

    this.cargarListaProductos();

  }

  buscarCateSubCat(index) {
    this.showListProducto = true;
    const val = index.target.value;

    if (val && val.trim() != '') {

      this.arrayProductos = this.productosViewModel.filter((x) => {
        return (x.nombreProducto.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });

    }
  }

  pedirProducto() {

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

    console.log(this.pedido);
    //TODO Aqui debo llamar al servicio y realizar algun otro control para no enviar vacio

    this.enviarPedido();
    //this.mostrarCarrito();
  }

  enviarPedido() {
    this.storage.set('pedido', JSON.stringify(this.pedido));   //almaceno el pedido
    this.viewCtrl.dismiss();
    let modal = this.modalCtrl.create(CarritoPage, { data: this.pedido });
    modal.present();
  }

  ionViewDidLoad() { }


}
