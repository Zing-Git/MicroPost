import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MensajeroPage } from './mensajero';

@NgModule({
  declarations: [
    MensajeroPage,
  ],
  imports: [
    IonicPageModule.forChild(MensajeroPage),
  ],
})
export class MensajeroPageModule {}
