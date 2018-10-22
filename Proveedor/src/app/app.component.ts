import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { ListadoPedidoPage } from '../pages/pedido/listado-pedido/listado-pedido';
import { ListadoPedidosFiltradosPage } from '../pages/pedido/listado-pedidos-filtrados/listado-pedidos-filtrados';
import { ListadoInvitacionPage } from '../pages/invitacion/listado-invitacion/listado-invitacion';
import { CrearPublicidadPage } from '../pages/publicidad/crear-publicidad/crear-publicidad';
import { AuxiliarProvider } from '../providers/auxiliar/auxiliar';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  razonSocial: string;
  rubroProveedor: string;

  @ViewChild(Nav) nav: Nav;

  pages: Array<{ title: string, component: any }>;
  username = '';

  datosComercio: any[];

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    event: Events,
    auxiliarServices: AuxiliarProvider) {

    this.razonSocial = auxiliarServices.getRazonSocial();
    this.rubroProveedor = auxiliarServices.getRubroProveedor();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [

      { title: 'Pedidos de Clientes', component: ListadoPedidosFiltradosPage },
      { title: 'Invitaciones', component: ListadoInvitacionPage },
      { title: 'Publicidad', component: CrearPublicidadPage },
      /*{ title: 'Pedidos de Clientes', component: ListadoPedidoPage }, 
      { title: 'Configuracion', component: ConfiguracionInicialPage },*/
      { title: 'Salir', component: LoginPage }
    ];

    event.subscribe('creado', (proveedor, rubro) => {
      this.razonSocial = proveedor;
      this.rubroProveedor =(!!rubro) ? rubro.charAt(0).toUpperCase() + rubro.substr(1).toLowerCase() : '';
    })
  }

  openPage(page) {

    this.nav.setRoot(page.component);
  }
}

