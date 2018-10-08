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

import { IonicStorageModule } from '@ionic/storage';

import { HttpClientModule } from '@angular/common/http';
import { ProveedorProvider } from '../providers/proveedor/proveedor';
import { LoginProvider } from '../providers/login/login';
import { AltaClientePage } from '../pages/alta/alta-cliente/alta-cliente';
import { ComercioProvider } from '../providers/comercio/comercio';
import { ListadoPedidoPage } from '../pages/pedido/listado-pedido/listado-pedido';
import { DetallePedidoProveedorPage } from '../pages/pedido/detalle-pedido-proveedor/detalle-pedido-proveedor';
import { DecimalPipe } from '@angular/common'; 
import { ListadoPedidosFiltradosPage } from '../pages/pedido/listado-pedidos-filtrados/listado-pedidos-filtrados';
import { PedidoProvider } from '../providers/pedido/pedido';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AltaDomicilioPage,
    AltaLoginPage,
    AltaClientePage, 
    ListadoPedidoPage,
    DetallePedidoProveedorPage,
    ListadoPedidosFiltradosPage
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
    AltaDomicilioPage,
    AltaLoginPage,
    AltaClientePage,
    ListadoPedidoPage,
    DetallePedidoProveedorPage,
    ListadoPedidosFiltradosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
      ,
    ProveedorProvider,
    LoginProvider,
    ComercioProvider,
    AuxiliarProvider,
    DecimalPipe,
    PedidoProvider
  ]
})
export class AppModule {}
