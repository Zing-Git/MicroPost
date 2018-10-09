import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { ListadoPedidoPage } from '../pages/pedido/listado-pedido/listado-pedido';
import { ListadoPedidosFiltradosPage } from '../pages/pedido/listado-pedidos-filtrados/listado-pedidos-filtrados';
import { ListadoInvitacionPage } from '../pages/invitacion/listado-invitacion/listado-invitacion';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  @ViewChild(Nav) nav: Nav;

  pages: Array<{ title: string, component: any }>;
  username = '';

  datosComercio: any[];

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Pedidos de Clientes', component: ListadoPedidoPage }, 
      { title: 'Pedidos Filtrados', component: ListadoPedidosFiltradosPage },
      { title: 'Invitaciones', component: ListadoInvitacionPage },
      /*{ title: 'Proveedores de MicroPOS', component: ListaProveedoresModalPage },
      { title: 'Configuracion', component: ConfiguracionInicialPage },*/
      { title: 'Salir', component: LoginPage }
    ];
    
  }

  openPage(page) {
    
    this.nav.setRoot(page.component);
  }
}

