import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoPedidosFiltradosPage } from './listado-pedidos-filtrados';

@NgModule({
  declarations: [
    ListadoPedidosFiltradosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoPedidosFiltradosPage),
  ],
})
export class ListadoPedidosFiltradosPageModule {}
