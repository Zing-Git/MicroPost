import { Component } from '@angular/core';
import { NavController, Refresher, AlertController, LoadingController } from 'ionic-angular';
import Swal from 'sweetalert2';
import { Storage } from '@ionic/storage';
import { envirotment as ENV } from '../../environments/environment';
import { LoginModel } from '../../modelo/login';
import { LoginProvider } from '../../providers/login/login';
import { AltaClientePage } from '../alta/alta-cliente/alta-cliente';
import { ListadoPedidosFiltradosPage } from '../pedido/listado-pedidos-filtrados/listado-pedidos-filtrados';

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
    private alertCtrl: AlertController,
    public storage: Storage,
    public loadingCtrl: LoadingController) {
    this.limpiarValoresPorDefecto();

    console.log(ENV);
    this.newLogin = new LoginModel();

  }

  getLogin() {

    const loader = this.loadingCtrl.create({
      content: "Por favor Espere unos segundos...",
      duration: 6000
    });
    loader.present();

    if ((typeof this.newLogin.nombreUsuario != 'undefined' && this.newLogin.nombreUsuario != ' ') && (typeof this.newLogin.clave != 'undefined' && this.newLogin.clave != ' ')) {

      this.login.getLogin(this.newLogin).subscribe(result => {

        this.usuarioLogin = result['usuario'];
        
        if (typeof this.usuarioLogin === 'undefined') {
          loader.dismiss();
          Swal('Atención', 'Ocurrio un problema, vuelva a ingresar las credenciales', 'error');
        } else {

          this.datosProveedor = result['proveedorDB'];
          
          if (this.datosProveedor != undefined) {
            this.datosProveedor.forEach(element => {
              this.idProveedor = element._id;

            });
            if (this.idProveedor != undefined) {
              this.almacenarValoresImportantes();
              loader.dismiss();
              this.navCtrl.setRoot(ListadoPedidosFiltradosPage, {
                animate: true
              });
            } else {
              loader.dismiss();
              Swal('Atención', 'Usted no es Proveedor, ingrese con credenciales validas' , 'error')
            }
          }


        }

      }, err => {
        loader.dismiss();
        Swal('Atención', 'Ocurrio un problema inesperado codigo: ' + err, 'error')
      });
    } else {
      loader.dismiss();
      Swal('Atención', 'Ocurrio un problema, vuelva a ingresar las credenciales', 'error');
    }
  }

  goCreateCliente() {
    //console.log('aqui');
    this.navCtrl.push(AltaClientePage);
  }

  ionViewDidLoad() { }

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
    this.storage.set('idProveedor', this.idProveedor);
    console.log(this.idProveedor);
    //this.storage.set('proveedor', JSON.stringify(this.datosProveedor));

    ENV.NOMBRE_USUARIO = this.newLogin.nombreUsuario;
    ENV.ID_USUARIO = this.usuarioLogin._id;
    ENV.PROVEEDOR_ID = this.idProveedor;
    ENV.TOKEN = this.usuarioLogin.token;
    ENV.PROVEEDOR_LOGIN = JSON.stringify(this.datosProveedor);
    /*this.storage.get('token').then((val) => {
      console.log('Your id is', val);
    });*/
    console.log(ENV);

  }

  limpiarValoresPorDefecto() {
    this.storage.set('id', ' ');
    this.storage.set('token', ' ');
    this.storage.set('idProveedor', ' ');

    //this.storage.set('proveedor', JSON.stringify(this.datosProveedor));

    ENV.NOMBRE_USUARIO = ' ';
    ENV.ID_USUARIO = ' ';
    ENV.PROVEEDOR_ID = ' ';
    ENV.TOKEN = ' ';
    ENV.PROVEEDOR_LOGIN = ' ';
  }

  showPassword() {
    this.showPass = !this.showPass;

    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

}
