import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, IonicPage, LoadingController } from 'ionic-angular';
import { ProveedorProvider } from '../../../../../providers/proveedor/proveedor';
import Swal from 'sweetalert2';
import { PedidoModalPage } from '../pedido-modal/pedido-modal';
import { Pedido } from '../../../../../modelo/pedido';
import { envirotment as ENV } from '../../../../../environments/environments';
import { ListaProveedoresPage } from '../../../pedido/lista-proveedores';
import { AuxiliarProvider } from '../../../../../providers/auxiliar/auxiliar';
import { Events } from 'ionic-angular';
import { CarritoModalPage } from '../carrito-modal/carrito-modal';
import { ListaPedidoComercioPage } from '../../../pedidosComercio/lista-pedido-comercio/lista-pedido-comercio';

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
  nombreProveedor: string;

  pedido: Pedido;
  productosPedidos: any[] = new Array();

  cantidadPedido: string = '0';
  totalPedido: string = '0';
  contadorCarrito: string = '0';

  duration: any = 'Seleccione Categoria'
  productoAEliminar: any = ' ';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private proveedorService: ProveedorProvider,
    private modalCtrl: ModalController,
    private auxiliar: AuxiliarProvider,
    private loadingCtrl: LoadingController,
    public events: Events
  ) {

    

    this.proveedor = navParams.get('data');
    this.pedido = new Pedido();
    this.nombreProveedor = this.proveedor.entidad.razonSocial;
    this.cargarListaProductos();

  }

  cargarListaProductos() {

    //this.nombrecomercio = ENV.NOMBRE_COMERCIO;
    const loader = this.loadingCtrl.create({
      content: "Por favor Espere unos segundos...",
      duration: 15000
    });
    loader.present();

    this.isEnabledSubCategoria = false;
    this.showListProducto = false;

    this.proveedorService.postGetProductosPorIdProveedor(this.proveedor._id).subscribe(result => {
      console.log(result);
      this.productosViewModel = result['productos'];
      if (this.productosViewModel.length < 1) {
        Swal(
          'Atención',
          'El proveedor no tiene productos',
          'info'
        );

         loader.dismiss();
        this.volver();         
      } else {
        this.iniciarArrays();
        loader.dismiss();
      }
    });


  }

  iniciarArrays() {


    this.productoCategorias = new Array();
    this.productoSubCategorias = new Array();

    this.arrayCategorias.length = 0;

    if (typeof this.productosViewModel != 'undefined') {
      //Inicializo el array de categorias y asigno el primer elemento
      this.productosViewModel.forEach(x => {
        this.productoCategorias.push(x.categoria);
      });

      this.arrayCategorias = this.auxiliar.crearArray(this.productoCategorias);

      this.arraySubcategorias.length = 0;
      this.arrayProductos.length = 0;
      this.categoria = this.arrayCategorias[0] || 1;

      //Inicializo el array de Sub categorias y asigno el primer elemento
      this.productosViewModel.forEach(x => {
        if (x.categoria === this.categoria) {
          this.productoSubCategorias.push(x.subcategoria);
        }
      });

      this.arraySubcategorias = this.auxiliar.crearArray(this.productoSubCategorias);
      this.itemSubcategoriaSelected = this.arraySubcategorias[0] || 1;

      this.cargarProductosViewModel();


    }

    ENV.PEDIDO = JSON.stringify(this.productosPedidos);  //aqui esta en blanco

  }

  cargarProductosViewModel() {
    this.arrayProductos.length = 0;

    this.productosViewModel.forEach(x => {
      if (x.subcategoria === this.itemSubcategoriaSelected && x.categoria === this.categoria) {
        this.arrayProductos.push(x);
      }
    });

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

    this.cargarProductosViewModel();

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

  controlarSiExisteProducto(producto: any): any {

    this.productosPedidos.length = 0;
    this.productosPedidos = JSON.parse(ENV.PEDIDO);
    console.log('Existe?')
    let nuevoProducto = this.productosPedidos.find(x => x._id === producto._id);
    if (typeof nuevoProducto != "undefined") {
      return nuevoProducto;
    } else {
      return "undefined";
    }

  }

  seleccionarProducto(producto: any) {
    this.productoAEliminar = this.controlarSiExisteProducto(producto);
    if (this.productoAEliminar!= "undefined") {
      Swal({
        title: 'Confirmar',
        html: 'Ya cargaste ' + this.productoAEliminar.nombreProducto + ' con cantidad de ' + this.productoAEliminar.cantidad + ' ' + this.productoAEliminar.unidadMedida + ', queres volver a agregar ' + this.productoAEliminar.nombreProducto + '?',
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
        confirmButtonColor: '#488aff',
        cancelButtonColor: '#488aff',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          /*console.log('antes de quitar ');
          console.log(this.productoAEliminar);
          console.log(this.productosPedidos);
          this.productosPedidos = this.productosPedidos.filter(x => x._id !== this.productoAEliminar._id);
          console.log('despues de sacar');
          console.log(this.productosPedidos);
          ENV.PEDIDO = JSON.stringify(this.productosPedidos);  //aqui esta en blanco

          Swal(
            'Listo!',
            'El producto fue retirado del carrito',
            'success'
          );
          this.calcularTotalCantidad();*/

          let nuevoProducto: any;
      let modal = this.modalCtrl.create(PedidoModalPage, { data: producto });

      modal.present();

      modal.onDidDismiss((location) => {
        //cargar en envirotment el listado de pedidos

        if (location.cantidad > 0) {

          this.productosPedidos = JSON.parse(ENV.PEDIDO);   //primero obtengo lista de productos
          console.log('RETORNA DE CREAR UN ITEM');
          console.log(location);
          nuevoProducto = location;                         //segundo agrego el nuevo producto
          this.productosPedidos.push({
            _id: nuevoProducto._id,
            unidadMedida: nuevoProducto.unidadMedida,
            cantidad: nuevoProducto.cantidad,
            nombreProducto: nuevoProducto.nombreProducto,
            precioProveedor: nuevoProducto.precioProveedor
          })

          ENV.PEDIDO = JSON.stringify(this.productosPedidos);   //tercero aqui almaceno la lista de productos
          //console.log('Productos Pedidos');
          //console.log(this.productosPedidos);

          this.calcularTotalCantidad();
        }

      });

      this.cargarListaProductos();
        } else {

        }
      })
    }
    else {
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
            nombreProducto: nuevoProducto.nombreProducto,
            precioProveedor: nuevoProducto.precioProveedor
          })

          ENV.PEDIDO = JSON.stringify(this.productosPedidos);   //tercero aqui almaceno la lista de productos
          //console.log('Productos Pedidos');
          //console.log(this.productosPedidos);

          this.calcularTotalCantidad();
        }

      });

      this.cargarListaProductos();
    }


  }

  buscarCateSubCat(index) {
    this.categoria = ' ';
    this.itemSubcategoriaSelected = ' ';
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

    this.elaborarPedido();

    //console.log(this.pedido);
    //TODO Aqui debo llamar al servicio y realizar algun otro control para no enviar vacio

    this.enviarPedido();
    //this.mostrarCarrito();
  }

  elaborarPedido(){
    this.productosPedidos = JSON.parse(ENV.PEDIDO);   //primero obtengo lista de productos

    /*this.storage.get('token').then((val) => {
      this.pedido.token = val
    });*/
    this.pedido.token = ENV.TOKEN;
    this.pedido.comercio = ENV.COMERCIO_ID;
    /*this.storage.get('idComercio').then((val) => {
      this.pedido.comercio = val
    });*/
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
  }
  enviarPedido() {

    //this.storage.set('pedido', JSON.stringify(this.pedido));   //almaceno el pedido
    if (this.pedido.productos.length > 0) {

      let modal = this.modalCtrl.create(CarritoModalPage, { data: this.pedido });
      modal.present();

      modal.onDidDismiss((location) => {   //aqui vienen los productos
        console.log('VOLVIENDO');
        console.log(location);
        if (location != null) {
          this.pedido.productos = location;

          ENV.PEDIDO = JSON.stringify(this.pedido.productos);   //tercero aqui almaceno la lista de productos

          this.calcularTotalCantidad();
        } else {
          //this.events.publish('reloadPage1');

          this.navCtrl.setRoot(ListaPedidoComercioPage);
          this.navCtrl.popToRoot();

        }

      });
    }


    // modal.onDidDismiss((location) => {});
  }

  ionViewDidLoad() { }

  calcularTotalCantidad() {
    let cantidadP = 0;
    let totalP = 0;
    let contador = 0;
    let total = 0;

    this.productosPedidos = JSON.parse(ENV.PEDIDO);
    this.productosPedidos.forEach(x => {
      totalP = totalP + +(x.precioProveedor);
      cantidadP = cantidadP + +(x.cantidad);
      contador += 1;
      total = total + (x.precioProveedor * x.cantidad);
    })

    //this.totalPedido = totalP.toFixed(2);
    this.totalPedido = total.toFixed(2);
    this.cantidadPedido = cantidadP.toString();
    this.contadorCarrito = contador.toString();
  }

  volver() {
    this.navCtrl.setRoot(ListaProveedoresPage);
    this.navCtrl.popToRoot();
  }

  showCarrito() {

    this.elaborarPedido();
    if (this.pedido.productos.length > 0) {

      let modal = this.modalCtrl.create(CarritoModalPage, { data: this.pedido });
      modal.present();

      modal.onDidDismiss((location) => {   //aqui vienen los productos

        if (location != null) {
          this.pedido.productos = location;

          ENV.PEDIDO = JSON.stringify(this.pedido.productos);   //tercero aqui almaceno la lista de productos

          this.calcularTotalCantidad();
        } else {
          //this.events.publish('reloadPage1');

          this.navCtrl.setRoot(ListaProveedoresPage);
          this.navCtrl.popToRoot();

        }

      });
      
    }
   /* this.productosPedidos.length = 0;
    this.productosPedidos = JSON.parse(ENV.PEDIDO);
    let htmlScript: string= ' ';

    this.productosPedidos.forEach(x => {
      htmlScript = htmlScript + ('<p>  ' + x.nombreProducto + '--->Cantidad: ' + x.cantidad + '--->Precio: $  ' + this.auxiliar.twoDecimals(x.precioProveedor) + '</p>');
    })

    Swal({
      title: 'Carrito!',
      html: htmlScript,
      type: 'success',
      showCancelButton: false,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Ok!',
      confirmButtonColor: '#488aff',
      cancelButtonColor: '#488aff',
      reverseButtons: true,
      

    }).then((result) => {
    })

*/
  }
}
