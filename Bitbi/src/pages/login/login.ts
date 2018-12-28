import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Events, ModalController } from 'ionic-angular';
import Swal from 'sweetalert2';

import { LoginModel } from '../../modelo/login';
import { LoginProvider } from '../../providers/login/login';
import { AltaClientePage } from '../Comercio/alta/alta-cliente/alta-cliente';
import { Storage } from '@ionic/storage';
import { envirotment as ENV } from '../../environments/environments';
import { AuxiliarProvider } from '../../providers/auxiliar/auxiliar';
import { ListaPedidoComercioPage } from '../Comercio/pedidosComercio/lista-pedido-comercio/lista-pedido-comercio';
import { AppVersion } from '@ionic-native/app-version';
import { ListadoPedidosFiltradosPage } from '../Proveedor/pedido/listado-pedidos-filtrados/listado-pedidos-filtrados';
import { RegistroPage } from './model/registro';
import { LoginSelectorPage } from './login-selector/login-selector';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  esPedidoDe: string = 'Otro';
  newLogin: LoginModel;
  usuarioLogin: any;   //get token and _id
  datosComercio: any;
  datosProveedor: any;
  idComercio: string;
  idProveedor: string;

  version: any;

  public readyToLogin: boolean;
  //private secureStorage: SecureStorage;

  public type = 'password';
  public showPass = false;

  constructor(private navCtrl: NavController,
    private login: LoginProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private event: Events,
    private auxiliar: AuxiliarProvider,
    private appVersion: AppVersion,
    private storage: Storage,
    public modalCtrl: ModalController) {

    this.getVersionNumber();
    /*if (ENV.NEWLOGIN !== ' ') {
      this.newLogin = JSON.parse(ENV.NEWLOGIN);

      this.getLoginStorage(this.newLogin.nombreUsuario, this.newLogin.clave)
    }

    this.storage.get('yoSoy').then((val) => {
      if (val != ' ') {
        if (val != null) {
          this.storage.get('usuarioLogin').then((logeo) => {
            if (logeo != ' ') {
              if (logeo != null) {
                console.log(val);
                console.log(logeo);
                let newLogin = JSON.parse(logeo);
                this.getLoginStorage(newLogin.nombreUsuario, newLogin.clave, newLogin.tipo);
              }
            }
            //this.getLoginStorage(newLogin.nombreUsuario, newLogin.clave)
          });
        }
      }
    });*/
    this.storage.get('usuarioLogin').then((logeo) => {
      if (logeo != ' ') {
        if (logeo != null) {
          console.log(logeo);
          let newLogin = JSON.parse(logeo);
          this.getLoginStorage(newLogin.nombreUsuario, newLogin.clave, newLogin.tipo);
        }
      }
      //this.getLoginStorage(newLogin.nombreUsuario, newLogin.clave)
    });

    this.newLogin = new LoginModel();

  }

  getLoginStorage(usuario: string, clave: string, tipo: string) {

    this.newLogin.nombreUsuario = usuario;
    this.newLogin.clave = clave;
    this.newLogin.tipo = tipo;
    console.log(this.newLogin);

    const loader = this.loadingCtrl.create({
      content: "Cargando datos, espere unos segundos, Gracias...",
      duration: 15000
    });
    loader.present();

    switch (tipo) {
      case 'comercio': {
        this.login.getLoginComercio(this.newLogin).subscribe(resultComercio => {
          this.usuarioLogin = resultComercio['usuario'];
          this.datosComercio = resultComercio['comercioDB'];
          this.datosComercio.forEach(element => {
            this.idComercio = element._id;
            ENV.NOMBRE_COMERCIO = element.entidad.razonSocial;
            ENV.RUBRO_COMERCIO = element.entidad.actividadPrincipal;
            ENV.COMERCIO_ID = this.idComercio;
          });
          ENV.COMERCIO_LOGIN = JSON.stringify(this.datosComercio);

          this.almacenarLogin('comercio');
          this.event.publish('creado', ENV.NOMBRE_COMERCIO, ENV.RUBRO_COMERCIO, 'comercio');
          this.navCtrl.setRoot(ListaPedidoComercioPage, { animate: true });
          this.navCtrl.popToRoot();
          loader.dismiss();
        })
        break;
      }
      case 'proveedor': {

        this.login.getLoginProveedor(this.newLogin).subscribe(resultProveedor => {
          console.log(resultProveedor);
          this.usuarioLogin = resultProveedor['usuario'];

          this.datosProveedor = resultProveedor['proveedorDB'];

          if (this.datosProveedor.length > 0) {

            this.datosProveedor.forEach(element => {

              this.idProveedor = element._id;
              ENV.NOMBRE_PROVEEDOR = element.entidad.razonSocial;
              ENV.RUBRO_PROVEEDOR = element.entidad.actividadPrincipal;
            });

            ENV.PROVEEDOR_ID = this.idProveedor;
            this.almacenarLogin('proveedor');
            this.event.publish('creado', ENV.NOMBRE_PROVEEDOR, ENV.RUBRO_PROVEEDOR, 'proveedor');


            this.navCtrl.setRoot(ListadoPedidosFiltradosPage, { animate: true });
            this.navCtrl.popToRoot();
            loader.dismiss();
          }
        })
        break;
      }
      default: {
        loader.dismiss();
        break;
      }
    }
    //loader.dismiss();
  }
  /*getLoginStorage(usuario: string, clave: string) {
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

        Swal('Atención', 'Usted no es Cliente, ingrese con credenciales validas', 'error');
        loader.dismiss();
      }

    })



  }*/

  getLogin() {

    //this.auxiliar.presentLoading();

    const loader = this.loadingCtrl.create({
      content: "Por favor Espere unos segundos...",
      duration: 15000
    });
    loader.present();

    if ((typeof this.newLogin.nombreUsuario != 'undefined' && this.newLogin.nombreUsuario != ' ') && (typeof this.newLogin.clave != 'undefined' && this.newLogin.clave != ' ')) {

      //1_ Trabajo con login de comercio
      this.login.getLoginComercio(this.newLogin).subscribe(result => {
        console.log(result);

        if (result['ok'] != true) {

          this.login.getLoginProveedor(this.newLogin).subscribe(resultProveedor => {
            console.log(resultProveedor);
            if (resultProveedor['ok'] != true) {
              Swal('Atención', 'Vuelva a ingresar las credenciales', 'error');

              this.navCtrl.setRoot(LoginPage, { animate: true });
              this.navCtrl.popToRoot();
              loader.dismiss();
            } else {
              console.log(resultProveedor);
              this.usuarioLogin = resultProveedor['usuario'];

              this.datosProveedor = resultProveedor['proveedorDB'];
              console.log(this.datosProveedor.length)
              if (this.datosProveedor.length > 0) {

                this.datosProveedor.forEach(element => {

                  this.idProveedor = element._id;
                  ENV.NOMBRE_PROVEEDOR = element.entidad.razonSocial;
                  ENV.RUBRO_PROVEEDOR = element.entidad.actividadPrincipal;
                });
                ENV.PROVEEDOR_ID = this.idProveedor;

                this.almacenarLogin('proveedor');
                this.event.publish('creado', ENV.NOMBRE_PROVEEDOR, ENV.RUBRO_PROVEEDOR, 'proveedor');

                console.log('me voy a pedidos filtrados');
                this.navCtrl.setRoot(ListadoPedidosFiltradosPage, {
                  animate: true
                });
                this.navCtrl.popToRoot();
                loader.dismiss();
              } else {
                //error inesperado
                loader.dismiss();
              }
            }
          }
            , err => {
              Swal('Atención', 'Ocurrio un problema inesperado codigo: ' + err, 'error')
              loader.dismiss();
            });    //cierro promesa de proveedor


          /*Swal('Atención', 'Vuelva a ingresar las credenciales', 'error');
          this.navCtrl.setRoot(LoginPage, { animate: true });
          this.navCtrl.popToRoot();
          loader.dismiss();*/

        } else {

          this.usuarioLogin = result['usuario'];

          this.datosComercio = result['comercioDB'];
          //si es >0 => es un comerciante
          if (this.datosComercio.length > 0) {
            //this.usuarioLogin = result['usuario'];

            this.datosComercio.forEach(element => {

              this.idComercio = element._id;
              ENV.NOMBRE_COMERCIO = element.entidad.razonSocial;
              ENV.RUBRO_COMERCIO = element.entidad.actividadPrincipal;
              ENV.COMERCIO_ID = this.idComercio;
            });

            ENV.COMERCIO_LOGIN = JSON.stringify(this.datosComercio);

            this.almacenarLogin('comercio');
            this.event.publish('creado', ENV.NOMBRE_COMERCIO, ENV.RUBRO_COMERCIO, 'comercio');

            this.navCtrl.setRoot(ListaPedidoComercioPage, { animate: true });
            this.navCtrl.popToRoot();
            loader.dismiss();
          } else { }
        }
      }, err => {
        Swal('Atención', 'Ocurrio un problema inesperado codigo: ' + err, 'error')
        loader.dismiss();
      });   //aqui cierro la promesa de Coemrcio pero tengo el ok verdadero de login y newLogin

    } else {
      Swal('Atención', 'Ocurrio un problema inesperado', 'error')
      loader.dismiss();
    }

  }

  async goRegistroPage() {

    const { value: tipo } = await Swal({
      title: 'Registrarme como',
      input: 'radio',

      inputOptions: {
        'comercio': 'Comercio',
        'proveedor': 'Proveedor'
      },
      
      confirmButtonColor: '#488aff',
      confirmButtonClass: 'btn btn-success',
      confirmButtonText: 'Continuar',
      cancelButtonColor: '#488aff',
      reverseButtons: true,
      showCloseButton: true,
      showCancelButton: false,
      animation: true,
      customClass: 'animated tada',
      inputValidator: (value) => {
        return new Promise((resolve) => {
          console.log(value);
          if (value) {
            resolve()
          } else {
            resolve('Debe seleccionar un valor')
          }
        })
      }
    })

    if (tipo) {
      switch (tipo) {
        case 'comercio': {
          this.navCtrl.push(AltaClientePage);
          break;
        }
        case 'proveedor': {
          let modal = this.modalCtrl.create(RegistroPage);
          modal.present();
          break;
        }
      }

    }
  }

   ionViewDidLoad() {
    
  }

  registroPageSelector() {
    const modal = this.modalCtrl.create(LoginSelectorPage);
    modal.present();
    /*
    const stringMio = ' <p> Estas por registrarte como <strong>COMERCIO</strong>, '+
                            'podrás ver todos los proveedores de Bitbi '+
                            'para que hagas pedidos al mejor precio</p>'
    Swal({
      title: 'Registro',
      html: stringMio,
      imageUrl: '../../assets/imgs/icono_comercio.png',
      imageWidth: 80,
      imageHeight: 80,
      imageAlt: 'Custom image',
      showCancelButton: true,
      showCloseButton: true,
      animation: true,
      footer: '<img style="border-radius: 4px; width: 30%; height: 50%" src="../../assets/icon/camion.ico"> "<a href="#" click="goProveedorPage();" return false;">Quiero vender en Bitbi</a>"',
      confirmButtonText: 'Continuar!',
      confirmButtonColor: '#488aff',
      cancelButtonColor: '#488aff',

      reverseButtons: true,
      cancelButtonText: '<img style="border-radius: 4px; width: 30%; height: 50%" src="../../assets/icon/camion.ico"> "<a href="#" click="goProveedorPage();" return false;">Quiero vender en Bitbi</a>"'
    }).then(result => {
      if (result.value) {
        this.navCtrl.push(AltaClientePage);
      }else{
        let modal = this.modalCtrl.create(RegistroPage);
        modal.present();
      }
    })

    */
  }

  goProveedorPage(){
    console.log('click');
    Swal.close();
    let modal = this.modalCtrl.create(RegistroPage);
    modal.present();
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

  public almacenarLogin(tipo: string): void {

    this.newLogin.tipo = tipo;
    this.storage.set('usuarioLogin', JSON.stringify(this.newLogin));
    //this.storage.set('yoSoy', yoSoy);
    ENV.NEWLOGIN = JSON.stringify(this.newLogin);
    ENV.TOKEN = this.usuarioLogin.token.toString();
    ENV.NOMBRE_USUARIO = this.newLogin.nombreUsuario;
    ENV.ID_USUARIO = this.usuarioLogin._id;
    ENV.APIKEY = JSON.stringify(this.usuarioLogin);
    console.log(ENV.TOKEN);
  }

  almacenarValoresImportantes() {
    /*this.storage.set('id', this.usuarioLogin._id);
    this.storage.set('token', this.usuarioLogin.token);
    this.storage.set('idComercio', this.idComercio);
  
    this.storage.set('comercio', JSON.stringify(this.datosComercio));*/




    /*this.storage.get('token').then((val) => {
      console.log('Your id is', val);
    });*/

  }

  limpiarValoresPorDefecto() {
    /*this.storage.set('id', ' ');
    this.storage.set('token', ' ');
    this.storage.set('idComercio', ' ');
  
    this.storage.set('comercio', ' ');
  */
    ENV.NOMBRE_USUARIO = ' ';
    ENV.ID_USUARIO = ' ';
    ENV.COMERCIO_ID = ' ';
    ENV.TOKEN = ' ';
    ENV.COMERCIO_LOGIN = ' ';
    ENV.ID_USUARIO = ' ';
    ENV.NOMBRE_COMERCIO = ' ';
    ENV.RUBRO_COMERCIO = ' ';
    ENV.PROVEEDOR_ID = ' ';
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

  async getVersionNumber() {
    const appNumber = await this.appVersion.getVersionNumber();
    this.auxiliar.getVersionFromServer().subscribe(result => {
      const appNumberServer = result['versiones'];
      if (+appNumber >= +appNumberServer.versionAndroidComercio){
        
      }else {
        Swal('Actualizar Aplicación Bitbi Comercio', 'Su version de aplicacion es ' + appNumber + ', nueva versión ' + appNumberServer.versionAndroidComercio, 'info');
      }
    })
  }



}
