import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaPedidoComercioPage } from './lista-pedido-comercio';

@NgModule({
  declarations: [
    ListaPedidoComercioPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaPedidoComercioPage),
  ],
})
export class ListaPedidoComercioPageModule {}
