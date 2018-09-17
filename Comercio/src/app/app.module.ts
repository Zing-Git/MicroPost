import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { AuxiliarProvider } from '../providers/auxiliar/auxiliar';
import { AltaDomicilioPage } from '../pages/alta-domicilio/alta-domicilio';
import { AltaLoginPage } from '../pages/alta-login/alta-login';

import { HttpClientModule } from '@angular/common/http';
import { ProveedorProvider } from '../providers/proveedor/proveedor';
import { LoginProvider } from '../providers/login/login';
import { AltaClientePage } from '../pages/alta-cliente/alta-cliente';
import { ComercioProvider } from '../providers/comercio/comercio';
import { ListaProveedoresPage } from '../pages/lista-proveedores/lista-proveedores';
import { ListaProveedoresModalPage } from '../pages/lista-proveedores-modal/lista-proveedores-modal';
import { ListaProductosModalPage } from '../pages/lista-productos-modal/lista-productos-modal';
import { ConfiguracionInicialPage } from '../pages/configuracion-inicial/configuracion-inicial';

import { IonicStorageModule } from '@ionic/storage';

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
    ConfiguracionInicialPage
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
    ConfiguracionInicialPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuxiliarProvider,
    ProveedorProvider,
    LoginProvider,
    ComercioProvider
  ]
})
export class AppModule {}
