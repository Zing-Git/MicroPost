import { Component } from '@angular/core';
import { NavController, Refresher, AlertController } from 'ionic-angular';
import Swal from 'sweetalert2';

import { LoginModel } from '../../modelo/login';
import { LoginProvider } from '../../providers/login/login';
import { AltaClientePage } from '../alta/alta-cliente/alta-cliente';
import { ConfiguracionInicialPage } from '../configuracion-inicial/configuracion-inicial';
import { Storage } from '@ionic/storage';
import { envirotment as ENV } from '../../environments/environments';
import { ListaProveedoresPage } from '../lista-proveedores/lista-proveedores';
import { ListaPedidoComercioPage } from '../pedidosComercio/lista-pedido-comercio/lista-pedido-comercio';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  esPedidoDe: string = 'Cliente';
  newLogin: LoginModel;
  usuarioLogin: any;   //get token and _id
  datosComercio: any;
  idComercio : string;
  idProveedor : string;
  public readyToLogin: boolean;
  //private secureStorage: SecureStorage;

  constructor(private navCtrl: NavController,
    private login: LoginProvider,
    private alertCtrl: AlertController,
    private storage: Storage) {
    this.newLogin = new LoginModel();

  }

  getLogin() {

    if ((typeof this.newLogin.nombreUsuario != 'undefined' && this.newLogin.nombreUsuario) && (typeof this.newLogin.clave != 'undefined' && this.newLogin.clave)) {

      this.login.getLogin(this.newLogin).subscribe(result => {
      
        this.usuarioLogin = result['usuario'];
        
        if (typeof this.usuarioLogin === 'undefined') {
          Swal('Atención', 'Ocurrio un problema, vuelva a ingresar las credenciales', 'error')
        } else {

          this.datosComercio = result['comercioDB'];
          this.datosComercio.forEach(element => {          
            this.idComercio = element._id;
          });

          this.almacenarValoresImportantes();
          //aqui un switch porque debo elegir mostrar lista de pedidos de clientes o proveedores
          
          switch (this.esPedidoDe) {
            case "Proveedor":{
                  this.navCtrl.setRoot(ListaPedidoComercioPage,{
                    animate: true});
              break;
            }
            case "Cliente": {
              this.navCtrl.setRoot(ListaPedidoComercioPage, {animate: true});
              break;
            }
            case "Otro":{
              this.navCtrl.setRoot(ListaProveedoresPage,{animate: true});
              break;
            }
            default:
            Swal('Atención', 'Ocurrio un problema, vuelva a ingresar las credenciales', 'error');
            this.navCtrl.setRoot(ConfiguracionInicialPage, { data: this.datosComercio }, {
              animate: true
            });
            /* this.navCtrl.setRoot(MenuPage);*/
          }
         
        }

      }, err => {
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

  doRefresh(refresher: Refresher) {
    setTimeout(() => {
      console.log("Termino el refhresh");
      this.newLogin = new LoginModel();
      refresher.complete();
    }, 1500);
  }

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
    
  }
}
