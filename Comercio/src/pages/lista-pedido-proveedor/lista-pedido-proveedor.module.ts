import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaPedidoProveedorPage } from './lista-pedido-proveedor';

@NgModule({
  declarations: [
    ListaPedidoProveedorPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaPedidoProveedorPage),
  ],
})
export class ListaPedidoProveedorPageModule {}
