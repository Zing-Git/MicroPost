import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallePedidoProveedorPage } from './detalle-pedido-proveedor';

@NgModule({
  declarations: [
    DetallePedidoProveedorPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallePedidoProveedorPage),
  ],
})
export class DetallePedidoProveedorPageModule {}
