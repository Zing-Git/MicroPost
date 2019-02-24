import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';

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
    public splashScreen: SplashScreen,
    private event: Events,
    appVersion: AppVersion,
    private pushNotificationService: PushnotificationProvider,
    public auxiliar: AuxiliarProvider,
    private loadingCtrl: LoadingController) {

    

    platform.ready().then(() => {
      const loader = this.loadingCtrl.create({
        content: "Iniciando la Aplicacion, gracias por esperar...",
        duration: 4000
      });
      loader.present();

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      //splashScreen.hide();
      this.hideSplashScreen();

      this.pushNotificationService.init_notifications();
      this.pushNotificationService.obtener_idPushUnico();

      appVersion.getVersionNumber().then(function (valor) {
        this.version = valor;
      });

      //this.control();

      this.event.subscribe('creado', (comercio, rubro, yoSoy) => {
        console.log('ESTOY EN EVENTO CREADO:---> ' + yoSoy);
        this.nombre = comercio;
        this.rubro = (!!rubro) ? rubro.charAt(0).toUpperCase() + rubro.substr(1).toLowerCase() : '';

        this.control(yoSoy);
      })

      ENV.CARRITO = JSON.stringify(this.version);

      this.event.subscribe('user:changed', (user, time) => {
        this.nav.setRoot(LoginPage);
      });
    });


  }

  hideSplashScreen() {
    if (this.splashScreen) {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 5000);
    }
  }


  openPage(page) {
    this.nav.setRoot(page.component);
  }

  crearMenuComercio() {

    this.pages = [
      { title: 'Mis Pedidos', component: ListaPedidoComercioPage, src: '', badge: '' },
      { title: 'Nuevo Pedido', component: ListaProveedoresPage, src: '', badge: '' },
      //{ title: 'Proveedores', component: ListaTodosProveedoresPage, src: '', badge: '' },
      { title: 'Ofertas', component: ListaPublicidadPage, src: '', badge: '' },        //../assets/imgs/hotSale.png
      //{ title: 'Configuracion', component: ConfiguracionInicialPage, src:'' },
      //{ title: 'Ayuda', component: AyudaPage, src: '',badge:'' },

      { title: 'Salir', component: SalirPage, src: '', badge: '' }
    ];
    console.log(this.pages);

  }

  crearMenuProveedor() {

    //this.nombre = this.auxiliarServices.getRazonSocial();
    //this.rubro = this.auxiliarServices.getRubroProveedor();
    //this.pages.length = 0;
    console.log('estoy en crear menu Proveedor');

    //this.pages = new Array<{ title: string, component: any, src: any, badge: any }>();

    this.pages = [
      { title: 'Pedidos de Clientes', component: ListadoPedidosFiltradosPage, src: '', badge: '' },
      //{ title: 'Invitaciones', component: ListadoInvitacionPage, src: '', badge: '' },
      { title: 'Publicidad', component: CrearPublicidadPage, src: '', badge: '' },
      { title: 'Mis Clientes', component: MisClientesPage, src: '', badge: '' },
      /*{ title: 'Configuracion', component: ConfiguracionInicialPage },
      { title: 'Mensajero', component: MensajeroPage, src: '',badge:'' },*/
      { title: 'Salir', component: SalirPage, src: '', badge: '' }
    ];

  }

  control(yoSoy: string) {

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

