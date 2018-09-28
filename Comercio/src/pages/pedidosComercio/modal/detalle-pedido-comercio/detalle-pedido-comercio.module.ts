import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallePedidoComercioPage } from './detalle-pedido-comercio';

@NgModule({
  declarations: [
    DetallePedidoComercioPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallePedidoComercioPage),
  ],
})
export class DetallePedidoComercioPageModule {}
