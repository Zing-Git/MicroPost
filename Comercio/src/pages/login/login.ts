import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Events } from 'ionic-angular';
import Swal from 'sweetalert2';

import { LoginModel } from '../../modelo/login';
import { LoginProvider } from '../../providers/login/login';
import { AltaClientePage } from '../alta/alta-cliente/alta-cliente';
import { Storage } from '@ionic/storage';
import { envirotment as ENV } from '../../environments/environments';
import { AuxiliarProvider } from '../../providers/auxiliar/auxiliar';
import { ListaPedidoComercioPage } from '../pedidosComercio/lista-pedido-comercio/lista-pedido-comercio';
import { AppVersion } from '@ionic-native/app-version';

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
  version: any;

  public readyToLogin: boolean;
  //private secureStorage: SecureStorage;

  public type = 'password';
  public showPass = false;

  constructor(private navCtrl: NavController,
    private login: LoginProvider,
    private alertCtrl: AlertController,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private event: Events,
    private auxiliar: AuxiliarProvider, 
    private appVersion: AppVersion) {

    this.getVersionNumber();
    this.storage.get('usuarioLogin').then((val) => {
      if (val != ' ') {

        if (val != null) {
          console.log('no es nulo');
          console.log(val);
          let newLogin = JSON.parse(val);
          console.log(newLogin);
          this.getLoginStorage(newLogin.nombreUsuario, newLogin.clave)
        }
      }
    });
    
    this.newLogin = new LoginModel();   

  }


  getLoginStorage(usuario: string, clave: string) {
    this.newLogin.nombreUsuario = usuario;
    this.newLogin.clave = clave;

    const loader = this.loadingCtrl.create({
      content: "Cargando datos, espere unos segundos, Gracias..."
    });
    loader.present();

    this.login.getLogin(this.newLogin).subscribe(result => {
      this.usuarioLogin = result['usuario'];
      this.datosComercio = result['comercioDB'];
      this.datosComercio.forEach(element => {
        this.idComercio = element._id;
        ENV.NOMBRE_COMERCIO = element.entidad.razonSocial;
        ENV.RUBRO_COMERCIO = element.entidad.actividadPrincipal;

      });

      this.event.publish('creado', ENV.NOMBRE_COMERCIO, ENV.RUBRO_COMERCIO);

      if (this.idComercio != undefined) {
        this.almacenarValoresImportantes();

        this.navCtrl.setRoot(ListaPedidoComercioPage, { animate: true });
        loader.dismiss();
      } else {
        loader.dismiss();
        Swal('Atención', 'Usted no es Cliente, ingrese con credenciales validas', 'error')
      }

    })



  }

  getLogin() {

    this.auxiliar.presentLoading();
    

    if ((typeof this.newLogin.nombreUsuario != 'undefined' && this.newLogin.nombreUsuario != ' ') && (typeof this.newLogin.clave != 'undefined' && this.newLogin.clave != ' ')) {
      const loader = this.loadingCtrl.create({
        content: "Por favor Espere unos segundos..."
      });
      loader.present();
      this.login.getLogin(this.newLogin).subscribe(result => {

        this.usuarioLogin = result['usuario'];

        if (typeof this.usuarioLogin === 'undefined') {         
          Swal('Atención', 'Ocurrio un problema, vuelva a ingresar las credenciales', 'error')
          loader.dismiss();
        } else {

          this.datosComercio = result['comercioDB'];
          this.datosComercio.forEach(element => {
            this.idComercio = element._id;
            ENV.NOMBRE_COMERCIO = element.entidad.razonSocial;
            ENV.RUBRO_COMERCIO = element.entidad.actividadPrincipal;

          });

          this.event.publish('creado', ENV.NOMBRE_COMERCIO, ENV.RUBRO_COMERCIO);

          if (this.idComercio != undefined) {
            this.almacenarValoresImportantes();

            this.navCtrl.setRoot(ListaPedidoComercioPage, { animate: true });
            loader.dismiss();
          } else {           
            Swal('Atención', 'Usted no es Cliente, ingrese con credenciales validas', 'error')
            loader.dismiss();
          }

        }

      }, err => {
        
        Swal('Atención', 'Ocurrio un problema inesperado', 'error')
        loader.dismiss();
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
    this.storage.set('usuarioLogin', JSON.stringify(this.newLogin));

    ENV.NOMBRE_USUARIO = this.newLogin.nombreUsuario;
    ENV.ID_USUARIO = this.usuarioLogin._id;
    ENV.COMERCIO_ID = this.idComercio;
    ENV.TOKEN = this.usuarioLogin.token;
    ENV.COMERCIO_LOGIN = JSON.stringify(this.datosComercio);
    /*this.storage.get('token').then((val) => {
      console.log('Your id is', val);
    });*/

  }

  limpiarValoresPorDefecto() {
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

  showPassword() {
    this.showPass = !this.showPass;

    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  llamar() {

    Swal({
      title: '<strong>No te preocupes!</strong>',
      type: 'info',
      html:
        'Mandanos un mensaje o llamanos a ' +
        '<a href="tel:+5493886001968" class="button button-positive">este número 388-6001968</a> ' +
        ', te preguntaremos datos de tu comercio.',
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Entendido!'

    })
  }

  async getVersionNumber(){
    const appNumber = await this.appVersion.getVersionNumber();
    this.auxiliar.getVersionFromServer().subscribe(result =>{
      const appNumberServer = result['versiones'];
      if(appNumber !== appNumberServer.versionAndroidComercio){
        Swal('Actualizar Aplicación Bitbi Comercio', 'Su version de aplicacion es ' + appNumber + ', nueva versión ' + appNumberServer.versionAndroidComercio, 'info');
      }
    })
  }


  
}
