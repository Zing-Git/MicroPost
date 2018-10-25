import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { ConfiguracionInicialPage } from '../pages/configuracion-inicial/configuracion-inicial';
import { ListaProveedoresModalPage } from '../pages/lista-proveedores/modal/lista-proveedores-modal/lista-proveedores-modal';
import { ListaProveedoresPage } from '../pages/pedido/lista-proveedores';
import { ListaPedidoComercioPage } from '../pages/pedidosComercio/lista-pedido-comercio/lista-pedido-comercio';
import { ListaPublicidadPage } from '../pages/publicidad/lista-publicidad/lista-publicidad';
import { AuxiliarProvider } from '../providers/auxiliar/auxiliar';
import { AyudaPage } from '../pages/ayuda/ayuda';

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

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    auxiliarServices: AuxiliarProvider,
    event: Events) {
      
    this.nombreComercio = auxiliarServices.getNombreComercio();
    this.rubroComercio = auxiliarServices.getRubroComercio();
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();


      this.pages = [
        { title: 'Mis Pedidos', component: ListaPedidoComercioPage, src:'' },
        { title: 'Nuevo Pedido', component: ListaProveedoresPage, src:'' },
        { title: 'Proveedores', component: ListaProveedoresModalPage, src:'' },
        { title: 'Ofertas', component: ListaPublicidadPage, src:'../assets/imgs/hotSale.png' },        
        //{ title: 'Configuracion', component: ConfiguracionInicialPage, src:'' },
        { title: 'Ayuda', component: AyudaPage, src:'' },  
        { title: 'Salir', component: LoginPage, src:'' }
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

