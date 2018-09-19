import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Comercio } from '../../modelo/comercio';
import { ComercioProvider } from '../../providers/comercio/comercio';
import Swal from 'sweetalert2';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-lista-pedido-proveedor',
  templateUrl: 'lista-pedido-proveedor.html',
})
export class ListaPedidoProveedorPage {

  clienteViewModel: Comercio = new Comercio();
  pedidosViewModel: any[];
  idComercio: string;

  //test
  toggle01: boolean = true;
  toggle02: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private comercioServices: ComercioProvider,
    private storage: Storage) {
    //this.idComercio = navParams.get('data');

    this.obtenerDatosImportantes();
    console.log(this.idComercio);

    this.executeProvider(this.idComercio);
  }

  ionViewDidLoad() {

  }

  onPedidoChange(index: string) {

  }

  obtenerDatosImportantes() {

    this.storage.get('idComercio').then((val) => {
      this.idComercio = val;
    });

  }
  executeProvider(idComercio: string) {
    this.comercioServices.getPedidoAProveedor(idComercio).subscribe(result => {
      if (typeof result !== 'undefined') {
        this.pedidosViewModel = result['pedidos'];

        console.log(this.pedidosViewModel);
      } else {
        Swal(
          'Error!',
          'No hay Pedidos de Proveedores',
          'warning'
        );
      }
    });
  }

  toggleOne() {
    this.toggle01 = !this.toggle02;
  }

  toggleTwo() {
    this.toggle02 = !this.toggle01;
  }

}
