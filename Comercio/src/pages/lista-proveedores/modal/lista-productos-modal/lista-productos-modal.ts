import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ProveedorProvider } from '../../../../providers/proveedor/proveedor';
import Swal from 'sweetalert2';
import { PedidoModalPage } from '../pedido-modal/pedido-modal';
import { Pedido } from '../../../../modelo/pedido';

import { envirotment as ENV } from '../../../../environments/environments';
import { Storage } from '@ionic/storage';

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
    private proveedorService: ProveedorProvider,
    private modalCtrl: ModalController,
    private storage: Storage) {
    this.proveedor = navParams.get('data');
    this.cargarListaProductos();
  }

  ionViewDidLoad() {

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
  pedirProducto() {
    this.pedido = new Pedido();
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
        cantidad: nuevoProducto.cantidad
      })

      console.log('Productos Pedidos');
      console.log(this.productosPedidos);
    });

    this.cargarListaProductos();

  }

  buscarCateSubCat(index) {
    this.showListProducto = true;
    console.log(index);
    const val = index.target.value;

    if (val && val.trim() != '') {

      this.arrayProductos = this.productosViewModel.filter((x) => {
        return (x.nombreProducto.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });

    }
  }
}
