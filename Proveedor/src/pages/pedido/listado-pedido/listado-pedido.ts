import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { envirotment as ENV } from '../../../environments/environment';
import { ProveedorProvider } from '../../../providers/proveedor/proveedor';
import { DetallePedidoProveedorPage } from '../detalle-pedido-proveedor/detalle-pedido-proveedor';

@IonicPage()
@Component({
  selector: 'page-listado-pedido',
  templateUrl: 'listado-pedido.html',
})
export class ListadoPedidoPage {

  datosProveedor: any;
  idProveedor: string;
  pedidos: any[] = new Array();
  pedidosViewModel: any[] = new Array();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public proveedorServices: ProveedorProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController) {

    const loader = this.loadingCtrl.create({
      content: "Por favor Espere unos segundos..."

    });
    loader.present();
    this.idProveedor = ENV.PROVEEDOR_ID;
    this.datosProveedor = JSON.parse(ENV.PROVEEDOR_LOGIN);
    this.obtenerDatosImportantes();
    loader.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoPedidoPage');
  }

  obtenerDatosImportantes() {

    /*this.proveedorServices.getPedidosProveedor(this.idProveedor).subscribe(result => {

      this.pedidos = result['pedidos_array'];
      console.log(this.pedidos);
    })*/

    this.proveedorServices.load(this.idProveedor).then(data => {
      this.pedidos = data['pedidos_array'];
      this.pedidos.forEach(x => {
        if (x.comercio != null) {
          this.pedidosViewModel.push(x);
        }
      })

    });
    console.log(this.pedidosViewModel);
  }

  visualizarDatosPedido(item: any) {
    const modal = this.modalCtrl.create(DetallePedidoProveedorPage, { data: item });
    modal.present();
  }

  visualizarDatosFiltrados(){
    
  }
}
