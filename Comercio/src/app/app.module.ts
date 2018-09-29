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
import { ListaProveedoresPage } from '../pages/lista-proveedores/lista-proveedores';
import { ListaProveedoresModalPage } from '../pages/lista-proveedores/modal/lista-proveedores-modal/lista-proveedores-modal';
import { ListaProductosModalPage } from '../pages/lista-proveedores/modal/lista-productos-modal/lista-productos-modal';
import { ConfiguracionInicialPage } from '../pages/configuracion-inicial/configuracion-inicial';

import { IonicStorageModule } from '@ionic/storage';
//import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
//import { GoogleMapsProvider } from '../providers/google-maps/google-maps';

import { PedidoModalPage } from '../pages/lista-proveedores/modal/pedido-modal/pedido-modal';
import { CarritoPage } from '../pages/lista-proveedores/modal/carrito/carrito';
import { ProductoProvider } from '../providers/producto/producto';
import { ListaPedidoComercioPage } from '../pages/pedidosComercio/lista-pedido-comercio/lista-pedido-comercio';
import { DetallePedidoComercioPage } from '../pages/pedidosComercio/modal/detalle-pedido-comercio/detalle-pedido-comercio';
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
    ListaProveedoresPage,
    ListaProductosModalPage,
    ConfiguracionInicialPage,
    PedidoModalPage,
    CarritoPage,
    ListaPedidoComercioPage,
    DetallePedidoComercioPage
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
    ListaProveedoresPage,
    ListaProductosModalPage,
    ConfiguracionInicialPage,
    PedidoModalPage,
    CarritoPage,
    ListaPedidoComercioPage,
    DetallePedidoComercioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuxiliarProvider,
    ProveedorProvider,
    LoginProvider,
    ComercioProvider,
    ProductoProvider
  ]
})
export class AppModule {}
