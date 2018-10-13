import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import Swal from 'sweetalert2';

import { LoginModel } from '../../modelo/login';
import { LoginProvider } from '../../providers/login/login';
import { AltaClientePage } from '../alta/alta-cliente/alta-cliente';
import { ConfiguracionInicialPage } from '../configuracion-inicial/configuracion-inicial';
import { Storage } from '@ionic/storage';
import { envirotment as ENV } from '../../environments/environments';
import { ListaProveedoresPage } from '../lista-proveedores/lista-proveedores';
import { ListaPedidoComercioPage } from '../pedidosComercio/lista-pedido-comercio/lista-pedido-comercio';
import { AuxiliarProvider } from '../../providers/auxiliar/auxiliar';
import { ListaPublicidadPage } from '../publicidad/lista-publicidad/lista-publicidad';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  esPedidoDe: string = 'Otro';
  newLogin: LoginModel;
  usuarioLogin: any;   //get token and _id
  datosComercio: any;
  idComercio: string;
  
  public readyToLogin: boolean;
  //private secureStorage: SecureStorage;

  public type = 'password';
  public showPass = false;

  constructor(private navCtrl: NavController,
    private login: LoginProvider,
    private alertCtrl: AlertController,
    private storage: Storage,
    private auxiliar: AuxiliarProvider, private loadingCtrl: LoadingController) {
    this.newLogin = new LoginModel();

  }


  getLogin() {
    //this.auxiliar.presentLoading();
    const loader = this.loadingCtrl.create({
      content: "Por favor Espere unos segundos..."
     
    });
    loader.present();
    
    if ((typeof this.newLogin.nombreUsuario != 'undefined' && this.newLogin.nombreUsuario!= ' ') && (typeof this.newLogin.clave != 'undefined' && this.newLogin.clave != ' ')) {

      this.login.getLogin(this.newLogin).subscribe(result => {

        this.usuarioLogin = result['usuario'];

        if (typeof this.usuarioLogin === 'undefined') {
          loader.dismiss();
          Swal('Atención', 'Ocurrio un problema, vuelva a ingresar las credenciales', 'error')
        } else {
          
          this.datosComercio = result['comercioDB'];
          this.datosComercio.forEach(element => {
            this.idComercio = element._id;
          });

          if(this.idComercio != undefined){
            this.almacenarValoresImportantes();
          //aqui un switch porque debo elegir mostrar lista de pedidos de clientes o proveedores
          loader.dismiss();
          switch (this.esPedidoDe) {
            case "Proveedor": {
              this.navCtrl.setRoot(ListaPedidoComercioPage, {
                animate: true
              });
              break;
            }
            case "Cliente": {
              this.navCtrl.setRoot(ListaPedidoComercioPage, { animate: true });
              break;
            }
            case "Otro": {
              this.navCtrl.setRoot(ListaPublicidadPage, { animate: true });
              break;
            }
            default:
              Swal('Atención', 'Ocurrio un problema, vuelva a ingresar las credenciales', 'error');
              this.navCtrl.setRoot(ConfiguracionInicialPage, { data: this.datosComercio }, {
                animate: true
              });
            /* this.navCtrl.setRoot(MenuPage);*/
          }
          }else{
            loader.dismiss();
              Swal('Atención', 'Usted no es Cliente, ingrese con credenciales validas' , 'error')
          }
          

        }

      }, err => {
        loader.dismiss();
        Swal('Atención', 'Ocurrio un problema inesperado', 'error')
      });
    }
  }

  goCreateCliente() {
    //console.log('aqui');
    this.navCtrl.push(AltaClientePage);
  }

  ionViewDidLoad() {

  }

  /*doRefresh(refresher: Refresher) {
    setTimeout(() => {
      console.log("Termino el refhresh");
      this.newLogin = new LoginModel();
      refresher.complete();
    }, 1500);
  }*/

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Atencion',
      subTitle: 'Ingreso mal las credenciales',
      buttons: [{
        text: 'Ok',
        handler: () => {
          location.reload();
        }
      }]
    });
    alert.present();
  }

  almacenarValoresImportantes() {
    this.storage.set('id', this.usuarioLogin._id);
    this.storage.set('token', this.usuarioLogin.token);
    this.storage.set('idComercio', this.idComercio);

    this.storage.set('comercio', JSON.stringify(this.datosComercio));

    ENV.NOMBRE_USUARIO = this.newLogin.nombreUsuario;
    ENV.ID_USUARIO = this.usuarioLogin._id;
    ENV.COMERCIO_ID = this.idComercio;
    ENV.TOKEN = this.usuarioLogin.token;
    ENV.COMERCIO_LOGIN = JSON.stringify(this.datosComercio);
    /*this.storage.get('token').then((val) => {
      console.log('Your id is', val);
    });*/
    console.log(ENV);
  }

  limpiarValoresPorDefecto(){
    this.storage.set('id', ' ');
    this.storage.set('token', ' ');
    this.storage.set('idComercio', ' ');

    this.storage.set('comercio', ' ');

    ENV.NOMBRE_USUARIO = ' ';
    ENV.ID_USUARIO = ' ';
    ENV.COMERCIO_ID = ' ';
    ENV.TOKEN = ' ';
    ENV.COMERCIO_LOGIN = ' ';
  }

  showPassword(){
    this.showPass = !this.showPass;
 
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
}
