import { Component, ViewChild, Version } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';

import { ListaProveedoresModalPage } from '../pages/lista-proveedores/modal/lista-proveedores-modal/lista-proveedores-modal';
import { ListaProveedoresPage } from '../pages/pedido/lista-proveedores';
import { ListaPedidoComercioPage } from '../pages/pedidosComercio/lista-pedido-comercio/lista-pedido-comercio';
import { ListaPublicidadPage } from '../pages/publicidad/lista-publicidad/lista-publicidad';
import { AuxiliarProvider } from '../providers/auxiliar/auxiliar';
import { AyudaPage } from '../pages/ayuda/ayuda';
import { HomePage } from '../pages/home/home';
import { SalirPage } from '../pages/salir/salir';
import { AppVersion } from '@ionic-native/app-version';
import { Storage } from '@ionic/storage';
import { envirotment as ENV } from '../environments/environments';
import { PushnotificationProvider } from '../providers/pushnotification/pushnotification';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  @ViewChild(Nav) nav: Nav;

  pages: Array<{ title: string, component: any, src: any }>;
  username = '';
  nombreComercio: string;
  rubroComercio: string;
  datosComercio: any[];
  version: any;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    auxiliarServices: AuxiliarProvider,
    event: Events,
    appVersion: AppVersion,
    pushNotificationService: PushnotificationProvider) {
      
    this.nombreComercio = auxiliarServices.getNombreComercio();
    this.rubroComercio = auxiliarServices.getRubroComercio();
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      pushNotificationService.init_notifications();
      pushNotificationService.obtener_idPushUnico();
      
      appVersion.getVersionNumber().then(function(valor){
        this.version = valor;
      });

      


       ENV.CARRITO = JSON.stringify(this.version);
      this.pages = [
        { title: 'Mis Pedidos', component: ListaPedidoComercioPage, src:'' },
        { title: 'Nuevo Pedido', component: ListaProveedoresPage, src:'' },
        { title: 'Proveedores', component: ListaProveedoresModalPage, src:'' },
        { title: 'Ofertas', component: ListaPublicidadPage, src:'' },        //../assets/imgs/hotSale.png
        //{ title: 'Configuracion', component: ConfiguracionInicialPage, src:'' },
        { title: 'Ayuda', component: AyudaPage, src:'' },  
        { title: 'Salir', component: SalirPage, src:'' }
      ];
    });

    event.subscribe('creado', (comercio, rubro) => {
      this.nombreComercio = comercio;
      this.rubroComercio = (!!rubro) ? rubro.charAt(0).toUpperCase() + rubro.substr(1).toLowerCase() : '';
    })
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    
  }
}

