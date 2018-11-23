import { Component } from '@angular/core';
import { NavController, Refresher, LoadingController, Events } from 'ionic-angular';
import Swal from 'sweetalert2';
import { Storage } from '@ionic/storage';
import { envirotment as ENV } from '../../environments/environment';
import { LoginModel } from '../../modelo/login';
import { LoginProvider } from '../../providers/login/login';
import { AltaClientePage } from '../alta/alta-cliente/alta-cliente';
import { ListadoPedidosFiltradosPage } from '../pedido/listado-pedidos-filtrados/listado-pedidos-filtrados';
import { SalirPage } from '../salir/salir';
import { AppVersion } from '@ionic-native/app-version';
import { AuxiliarProvider } from '../../providers/auxiliar/auxiliar';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  newLogin: LoginModel;
  usuarioLogin: {
    _id: string,
    token: string
  };
  datosProveedor: any;
  public readyToLogin: boolean;
  idProveedor: string;
  public type = 'password';
  public showPass = false;

  constructor(private navCtrl: NavController,
    private login: LoginProvider,
    private appVersion: AppVersion,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    private event: Events,
    private auxiliar: AuxiliarProvider) {
    //this.limpiarValoresPorDefecto();

    this.getVersionNumber();
    this.storage.get('proveedor').then((val) => {
      if (val != ' ') {

        if (val != null) {
          let newLogin = JSON.parse(val);
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
      content: "Cargando datos, aguarde unos segundos, Gracias..."
    });
    loader.present();

    this.login.getLogin(this.newLogin).subscribe(result => {
      this.usuarioLogin = result['usuario'];
      this.datosProveedor = result['proveedorDB'];
      console.log(result);
      if (this.datosProveedor != undefined) {
        this.datosProveedor.forEach(element => {
          this.idProveedor = element._id;
          ENV.NOMBRE_PROVEEDOR = element.entidad.razonSocial;
          ENV.RUBRO_PROVEEDOR = element.entidad.actividadPrincipal;
        });

        this.event.publish('creado', ENV.NOMBRE_PROVEEDOR, ENV.RUBRO_PROVEEDOR);

        if (this.idProveedor != undefined) {
          this.almacenarValoresImportantes();

          this.navCtrl.setRoot(ListadoPedidosFiltradosPage, {
            animate: true
          });
          loader.dismiss();
        } else {
          Swal('Atención', 'Ocurrio un problema, vuelva a ingresar las credenciales', 'error')
          this.navCtrl.setRoot(SalirPage);
          loader.dismiss();
        }
      } else {
        Swal('Atención', 'Ocurrio un problema, vuelva a ingresar las credenciales', 'error')
        this.navCtrl.setRoot(SalirPage);
        loader.dismiss();
      }
    })



  }
  getLogin() {

    if ((typeof this.newLogin.nombreUsuario != 'undefined' && this.newLogin.nombreUsuario != ' ') && (typeof this.newLogin.clave != 'undefined' && this.newLogin.clave != ' ')) {

      const loader = this.loadingCtrl.create({
        content: "Por favor Espere unos segundos..."
      });
      loader.present();
      this.login.getLogin(this.newLogin).subscribe(result => {

        if (result['ok'] !== true) {
          Swal('Atención', 'Ocurrio un problema, vuelva a ingresar las credenciales', 'error');
          this.navCtrl.setRoot(LoginPage, { animate: true });
          loader.dismiss();
        } else {
          console.log(result);
          this.usuarioLogin = result['usuario'];

          if (typeof this.usuarioLogin === 'undefined') {
            Swal('Atención', 'Ocurrio un problema, vuelva a ingresar las credenciales', 'error');
            loader.dismiss();
          } else {

            this.datosProveedor = result['proveedorDB'];

            if (this.datosProveedor != undefined) {
              this.datosProveedor.forEach(element => {
                this.idProveedor = element._id;
                ENV.NOMBRE_PROVEEDOR = element.entidad.razonSocial;
                ENV.RUBRO_PROVEEDOR = element.entidad.actividadPrincipal;
              });

              this.event.publish('creado', ENV.NOMBRE_PROVEEDOR, ENV.RUBRO_PROVEEDOR);

              if (this.idProveedor != undefined) {
                this.almacenarValoresImportantes();

                this.navCtrl.setRoot(ListadoPedidosFiltradosPage, {
                  animate: true
                });
              } else {

                Swal('Atención', 'Usted no es Proveedor, ingrese con credenciales validas', 'error')
              }
            }
            loader.dismiss();

          }
        }
      }, err => {
        Swal('Atención', 'Ocurrio un problema inesperado codigo: ' + err, 'error')

      });

    } else {
      Swal('Atención', 'Ocurrio un problema, vuelva a ingresar las credenciales', 'error');
    }
  }

  goCreateCliente() {

    this.navCtrl.push(AltaClientePage);
  }

  ionViewDidLoad() { }

  doRefresh(refresher: Refresher) {
    setTimeout(() => {
      this.newLogin = new LoginModel();
      refresher.complete();
    }, 1500);
  }

  almacenarValoresImportantes() {
    //this.storage.set('id', this.usuarioLogin._id);
    //this.storage.set('token', this.usuarioLogin.token);
    //this.storage.set('idProveedor', this.idProveedor);
    
    this.storage.set('proveedor', JSON.stringify(this.newLogin));

    ENV.NOMBRE_USUARIO = this.newLogin.nombreUsuario;
    ENV.ID_USUARIO = this.usuarioLogin._id;
    ENV.PROVEEDOR_ID = this.idProveedor;
    ENV.TOKEN = this.usuarioLogin.token;
    ENV.PROVEEDOR_LOGIN = JSON.stringify(this.datosProveedor);

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
        '<i class="fa fa-thumbs-up"></i> Entendido!',
      confirmButtonColor: '#488aff'

    })
  }

  async getVersionNumber() {
    const appNumber = await this.appVersion.getVersionNumber();
    this.auxiliar.getVersionFromServer().subscribe(result => {
      const appNumberServer = result['versiones'];
      if (appNumber !== appNumberServer.versionAndroidProveedor) {
        Swal('Actualizar Aplicación Bitbi Proveedor', 'Su version de aplicacion es ' + appNumber + ', nueva versión ' + appNumberServer.versionAndroidProveedor, 'info');
      }
    })
  }

}
