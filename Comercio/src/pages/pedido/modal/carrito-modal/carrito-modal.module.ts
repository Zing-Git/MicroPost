import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarritoModalPage } from './carrito-modal';

@NgModule({
  declarations: [
    CarritoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CarritoModalPage),
  ],
})
export class CarritoModalPageModule {}
