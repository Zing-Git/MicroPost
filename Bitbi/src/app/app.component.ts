import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';

import { ListaProveedoresModalPage } from '../pages/Comercio/lista-proveedores/modal/lista-proveedores-modal/lista-proveedores-modal';
import { ListaProveedoresPage } from '../pages/Comercio/pedido/lista-proveedores';
import { ListaPedidoComercioPage } from '../pages/Comercio/pedidosComercio/lista-pedido-comercio/lista-pedido-comercio';
import { ListaPublicidadPage } from '../pages/Comercio/publicidad/lista-publicidad/lista-publicidad';
import { AuxiliarProvider } from '../providers/auxiliar/auxiliar';

import { SalirPage } from '../pages/salir/salir';
import { AppVersion } from '@ionic-native/app-version';
import { envirotment as ENV } from '../environments/environments';
import { PushnotificationProvider } from '../providers/pushnotification/pushnotification';
import { ListadoPedidosFiltradosPage } from '../pages/Proveedor/pedido/listado-pedidos-filtrados/listado-pedidos-filtrados';
import { ListadoInvitacionPage } from '../pages/Proveedor/invitacion/listado-invitacion/listado-invitacion';
import { CrearPublicidadPage } from '../pages/Proveedor/publicidad/crear-publicidad/crear-publicidad';
import { MisClientesPage } from './../pages/Proveedor/mis-clientes/mis-clientes';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  @ViewChild(Nav) nav: Nav;

  pages: Array<{ title: string, component: any, src: any, badge: any }>;
  username = '';
  nombre: string;
  rubro: string;
  datosComercio: any[];
  version: any;
  razonSocial: string;
  rubroProveedor: string;
  yoSoy: string;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private event: Events,
    appVersion: AppVersion,
    private pushNotificationService: PushnotificationProvider,
    public auxiliar: AuxiliarProvider,
    private loadingCtrl: LoadingController) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.pushNotificationService.init_notifications();
      this.pushNotificationService.obtener_idPushUnico();

      appVersion.getVersionNumber().then(function (valor) {
        this.version = valor;
      });

      //this.control();

      const loader = this.loadingCtrl.create({
        content: "Iniciando la Aplicacion, gracias por esperar...",
        duration: 3000
      });
      loader.present();

      this.event.subscribe('creado', (comercio, rubro, yoSoy) => {
        this.nombre = comercio;
        this.rubro = (!!rubro) ? rubro.charAt(0).toUpperCase() + rubro.substr(1).toLowerCase() : '';
        
        /*switch (yoSoy) {
          case 'comercio': {
            this.crearMenuComercio();
            break;
          }
          case 'proveedor': {
            this.crearMenuProveedor();
            break;
          }
          default: {
            this.pages = new Array<{ title: string, component: any, src: any, badge: any }>();
            break;
          }
        }
        */
        //this.yoSoy = yoSoy;
this.control(yoSoy);
      })
      
      ENV.CARRITO = JSON.stringify(this.version);

    });


  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  crearMenuComercio() {

    this.pages = new Array<{ title: string, component: any, src: any, badge: number }>();
    // this.nombre = this.auxiliarServices.getNombreComercio();
    //this.rubro= this.auxiliarServices.getRubroComercio();

    this.pages = [
      { title: 'Mis Pedidos', component: ListaPedidoComercioPage, src: '', badge: '' },
      { title: 'Nuevo Pedido', component: ListaProveedoresPage, src: '', badge: '' },
      { title: 'Proveedores', component: ListaProveedoresModalPage, src: '', badge: '' },
      { title: 'Ofertas', component: ListaPublicidadPage, src: '', badge: '' },        //../assets/imgs/hotSale.png
      //{ title: 'Configuracion', component: ConfiguracionInicialPage, src:'' },
      //{ title: 'Ayuda', component: AyudaPage, src: '',badge:'' },

      { title: 'Salir', component: SalirPage, src: '', badge: '' }
    ];


  }

  crearMenuProveedor() {

    //this.nombre = this.auxiliarServices.getRazonSocial();
    //this.rubro = this.auxiliarServices.getRubroProveedor();
    //this.pages.length = 0;
    console.log('estoy en crear menu Proveedor');
    console.log(this.pages);
    this.pages = new Array<{ title: string, component: any, src: any, badge: any }>();

    this.pages = [
      { title: 'Pedidos de Clientes', component: ListadoPedidosFiltradosPage, src: '', badge: '' },
      { title: 'Invitaciones', component: ListadoInvitacionPage, src: '', badge: '' },
      { title: 'Publicidad', component: CrearPublicidadPage, src: '', badge: '' },
      { title: 'Mis Clientes', component: MisClientesPage, src: '', badge: '' },
      /*{ title: 'Configuracion', component: ConfiguracionInicialPage },
      { title: 'Mensajero', component: MensajeroPage, src: '',badge:'' },*/
      { title: 'Salir', component: SalirPage, src: '', badge: '' }
    ];

    /*this.event.subscribe('creado', (proveedor, rubro) => {
      this.nombre = proveedor;
      this.rubro = (!!rubro) ? rubro.charAt(0).toUpperCase() + rubro.substr(1).toLowerCase() : '';
    })*/
  }

  control(yoSoy: string) {

    //inicialiso el push


    switch (yoSoy) {
      case 'comercio': {
        this.crearMenuComercio();
        break;
      }
      case 'proveedor': {
        this.crearMenuProveedor();
        break;
      }
      default: {
        this.pages = new Array<{ title: string, component: any, src: any, badge: any }>();
        break;
      }
    }
    //});
  }

}

