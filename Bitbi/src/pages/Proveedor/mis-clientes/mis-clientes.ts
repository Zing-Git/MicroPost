import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { envirotment as ENV } from '../../../environments/environments';
import { ProveedorProvider } from './../../../providers/proveedor/proveedor';
import Swal from 'sweetalert2';

@IonicPage()
@Component({
  selector: 'page-mis-clientes',
  templateUrl: 'mis-clientes.html',
})
export class MisClientesPage {

  idProveedor: any;
  comercios: any[];
  permitirRefresh: boolean = false;
  estado: boolean = true;
  telefono: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private proveedorService: ProveedorProvider) {
    this.cargaInicial();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisClientesPage');
  }

  cargaInicial() {

    this.comercios = new Array();
    const loader = this.loadingCtrl.create({
      content: "Cargando Comercios, espere unos segundos...",
      duration: 15000
    });
    loader.present();
    this.idProveedor = ENV.PROVEEDOR_ID;
    this.proveedorService.getTodosLosComercios(this.idProveedor).subscribe(result => {
      console.log(result);
      if (result['ok']) {
        this.estado = true;
        this.comercios = result['comercios'];
        
      } else {
        this.estado = false;
      }

    });
    loader.dismiss();

  }

  doRefresh(refresher?: any) { //"?" in typescript means the parameter is optional

    this.cargaInicial();
    refresher && refresher.complete();//make sure refresher is truthy before calling complete

  }

  async callWhatsapp(numeroCel: string) {

    const { value: mensaje } = await Swal({
      title: 'Comunicarse con el Cliente',
      input: 'textarea',


      confirmButtonColor: '#488aff',
      confirmButtonClass: 'btn btn-success',
      confirmButtonText: 'Enviar',
      cancelButtonColor: '#488aff',
      reverseButtons: true,
      showCancelButton: true,
      animation: true,
      customClass: 'animated tada',
      inputValidator: (value) => {
        return new Promise((resolve) => {
          console.log(value);
          if (value) {
            resolve()
          } else {
            resolve('Debe escribir un texto')
          }
        })
      }
    })

    if (mensaje) {
      let info =  mensaje;
      let api: string = 'https://wa.me/'; //https://api.whatsapp.com/send?phone=
      let miMensaje = info.split(' ').join('%20')
      let urlCall = api + numeroCel + '/?text=' + miMensaje;
      window.open(urlCall);

    }
    //this.volver();
  }

  buscar(index): void {
    
    const val = index.target.value;
    //item.comercio.entidad.razonSocial
    if (val && val.trim() != '') {
      if (this.comercios.length > 0) {
        this.comercios = this.comercios.filter((x) => {
          return (x.comercio.entidad.razonSocial.toLowerCase().indexOf(val.toLowerCase()) > -1)
        })
      }
     
    } else {

      this.cargaInicial();
    }
  }

}
