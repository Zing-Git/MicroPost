import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AltaContactosPage } from './alta-contactos';

@NgModule({
  declarations: [
    AltaContactosPage,
  ],
  imports: [
    IonicPageModule.forChild(AltaContactosPage),
  ],
})
export class AltaContactosPageModule {}
