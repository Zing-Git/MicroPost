import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { AuxiliarProvider } from '../providers/auxiliar/auxiliar';
import { AltaDomicilioPage } from '../pages/alta/alta-domicilio/alta-domicilio';
import { AltaLoginPage } from '../pages/alta/alta-login/alta-login';

import { HttpClientModule } from '@angular/common/http';
import { ProveedorProvider } from '../providers/proveedor/proveedor';
import { LoginProvider } from '../providers/login/login';
import { AltaClientePage } from '../pages/alta/alta-cliente/alta-cliente';
import { ComercioProvider } from '../providers/comercio/comercio';
import { ListaProveedoresPage } from '../pages/pedido/lista-proveedores';
import { ListaProveedoresModalPage } from '../pages/lista-proveedores/modal/lista-proveedores-modal/lista-proveedores-modal';

import { ConfiguracionInicialPage } from '../pages/configuracion-inicial/configuracion-inicial';

import { IonicStorageModule } from '@ionic/storage';
//import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
//import { GoogleMapsProvider } from '../providers/google-maps/google-maps';


import { ProductoProvider } from '../providers/producto/producto';
import { ListaPedidoComercioPage } from '../pages/pedidosComercio/lista-pedido-comercio/lista-pedido-comercio';
import { DetallePedidoComercioPage } from '../pages/pedidosComercio/modal/detalle-pedido-comercio/detalle-pedido-comercio';
import { DecimalPipe } from '@angular/common';
import { ListaPublicidadPage } from '../pages/publicidad/lista-publicidad/lista-publicidad';
import { ListaPublicidadModalPage } from '../pages/publicidad/modal/lista-publicidad-modal/lista-publicidad-modal';
import { InvitacionProveedorModalPage } from '../pages/lista-proveedores/modal/invitacion-proveedor-modal/invitacion-proveedor-modal';
import { CarritoPage } from '../pages/pedido/modal/carrito/carrito';
import { PedidoModalPage } from '../pages/pedido/modal/pedido-modal/pedido-modal';
import { ListaProductosModalPage } from '../pages/pedido/modal/lista-productos-modal/lista-productos-modal';
import { AltaContactosPage } from '../pages/alta/alta-contactos/alta-contactos';
import { AyudaPage } from '../pages/ayuda/ayuda';
import { DatePicker } from '@ionic-native/date-picker';
//declare module 'google-maps';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ListaProveedoresModalPage,
    AltaDomicilioPage,
    AltaLoginPage,
    AltaClientePage, 
    AltaContactosPage,
    ListaProveedoresPage,
    ListaProductosModalPage,
    ConfiguracionInicialPage,
    PedidoModalPage,
    CarritoPage,
    ListaPedidoComercioPage,
    DetallePedidoComercioPage,
    ListaPublicidadPage,
    ListaPublicidadModalPage,
    InvitacionProveedorModalPage,
    AyudaPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ListaProveedoresModalPage,
    AltaDomicilioPage,
    AltaLoginPage,
    AltaClientePage,
    AltaContactosPage,
    ListaProveedoresPage,
    ListaProductosModalPage,
    ConfiguracionInicialPage,
    PedidoModalPage,
    CarritoPage,
    ListaPedidoComercioPage,
    DetallePedidoComercioPage,
    ListaPublicidadPage,
    ListaPublicidadModalPage,
    InvitacionProveedorModalPage,
    AyudaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuxiliarProvider,
    ProveedorProvider,
    LoginProvider,
    ComercioProvider,
    ProductoProvider,
    DecimalPipe,
    DatePicker
  ]
})
export class AppModule {}
