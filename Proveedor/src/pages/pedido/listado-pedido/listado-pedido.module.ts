import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoPedidoPage } from './listado-pedido';

@NgModule({
  declarations: [
    ListadoPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoPedidoPage),
  ],
})
export class ListadoPedidoPageModule {}
