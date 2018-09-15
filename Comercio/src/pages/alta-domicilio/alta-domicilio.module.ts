import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AltaDomicilioPage } from './alta-domicilio';

@NgModule({
  declarations: [
    AltaDomicilioPage,
  ],
  imports: [
    IonicPageModule.forChild(AltaDomicilioPage),
  ],
})
export class AltaDomicilioPageModule {}
