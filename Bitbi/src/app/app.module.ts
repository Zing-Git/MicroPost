import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from "../pages/login/login";
import { AuxiliarProvider } from '../providers/auxiliar/auxiliar';
import { AltaDomicilioPage } from '../pages/Comercio/alta/alta-domicilio/alta-domicilio';
import { AltaLoginPage } from '../pages/Comercio/alta/alta-login/alta-login';

import { HttpClientModule } from '@angular/common/http';
import { ProveedorProvider } from '../providers/proveedor/proveedor';
import { LoginProvider } from '../providers/login/login';
import { AltaClientePage } from '../pages/Comercio/alta/alta-cliente/alta-cliente';
import { ComercioProvider } from '../providers/comercio/comercio';
import { ListaProveedoresPage } from '../pages/Comercio/pedido/lista-proveedores';


import { ConfiguracionInicialPage } from '../pages/Comercio/configuracion-inicial/configuracion-inicial';

import { IonicStorageModule } from '@ionic/storage';

//import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
//import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
// Plugins
import { OneSignal } from '@ionic-native/onesignal';


import { ProductoProvider } from '../providers/producto/producto';
import { ListaPedidoComercioPage } from '../pages/Comercio/pedidosComercio/lista-pedido-comercio/lista-pedido-comercio';
import { DetallePedidoComercioPage } from '../pages/Comercio/pedidosComercio/modal/detalle-pedido-comercio/detalle-pedido-comercio';
import { DecimalPipe } from '@angular/common';
import { ListaPublicidadPage } from '../pages/Comercio/publicidad/lista-publicidad/lista-publicidad';
import { ListaPublicidadModalPage } from '../pages/Comercio/publicidad/modal/lista-publicidad-modal/lista-publicidad-modal';
import { InvitacionProveedorModalPage } from '../pages/Comercio/lista-proveedores/modal/invitacion-proveedor-modal/invitacion-proveedor-modal';
import { CarritoPage } from '../pages/Comercio/pedido/modal/carrito/carrito';
import { PedidoModalPage } from '../pages/Comercio/pedido/modal/pedido-modal/pedido-modal';
import { ListaProductosModalPage } from '../pages/Comercio/pedido/modal/lista-productos-modal/lista-productos-modal';
import { AltaContactosPage } from '../pages/Comercio/alta/alta-contactos/alta-contactos';
import { AyudaPage } from '../pages/Comercio/ayuda/ayuda';
import { DatePicker } from '@ionic-native/date-picker';
import { SalirPage } from '../pages/salir/salir';
import { CarritoModalPage } from '../pages/Comercio/pedido/modal/carrito-modal/carrito-modal';

import { AppVersion } from '@ionic-native/app-version';
import { PushnotificationProvider } from '../providers/pushnotification/pushnotification';
//declare module 'google-maps';

//***********************************Proveedor*************************************** */



import { AltaProveedorDomicilioPage } from '../pages/Proveedor/alta/alta-domicilio/alta-proveedor-domicilio';
import { AltaProveedorLoginPage } from '../pages/Proveedor/alta/alta-login/alta-proveedor-login';


import { AltaProveedorClientePage } from '../pages/Proveedor/alta/alta-cliente/alta-proveedor-cliente';

import { DetallePedidoProveedorPage } from '../pages/Proveedor/pedido/detalle-pedido-proveedor/detalle-pedido-proveedor';
import { ListadoPedidosFiltradosPage } from '../pages/Proveedor/pedido/listado-pedidos-filtrados/listado-pedidos-filtrados';
import { PedidoProvider } from '../providers/pedido/pedido';
import { ListadoInvitacionPage } from '../pages/Proveedor/invitacion/listado-invitacion/listado-invitacion';

import { CrearPublicidadPage } from '../pages/Proveedor/publicidad/crear-publicidad/crear-publicidad';
import { Camera } from '@ionic-native/camera';
import { DatePipe } from '@angular/common';
import { MensajeroPage } from '../pages/mensajero/mensajero';
import { RegistroPage } from '../pages/login/model/registro';
import { LoginSelectorPage } from './../pages/login/login-selector/login-selector';
import { InvitacionModalPage } from '../pages/Proveedor/invitacion/invitacion-modal/invitacion-modal';

import { MisClientesPage } from './../pages/Proveedor/mis-clientes/mis-clientes';
import { ListaTodosProveedoresPage } from '../pages/Comercio/lista-proveedores/lista-todos-proveedores/lista-todos-proveedores';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ListaTodosProveedoresPage,
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
    AyudaPage,
    SalirPage,
    CarritoModalPage,
    AltaProveedorDomicilioPage,
    AltaProveedorClientePage,
    AltaProveedorLoginPage,
    DetallePedidoProveedorPage,
    ListadoPedidosFiltradosPage,
    
    ListadoInvitacionPage,
    CrearPublicidadPage,
    MensajeroPage,
    RegistroPage,
    LoginSelectorPage,
    InvitacionModalPage,
    MisClientesPage
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
    LoginPage,
    ListaTodosProveedoresPage,
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
    AyudaPage,
    SalirPage,
    CarritoModalPage,
    DetallePedidoProveedorPage,
    ListadoPedidosFiltradosPage,
    
    ListadoInvitacionPage,
    CrearPublicidadPage,
    MensajeroPage,
    RegistroPage,

    LoginSelectorPage,
    InvitacionModalPage,
    MisClientesPage
    
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
    DatePicker,
    AppVersion,
    OneSignal,
    PushnotificationProvider,
    DatePipe,
    PedidoProvider,
    Camera
  ]
})
export class AppModule {}
