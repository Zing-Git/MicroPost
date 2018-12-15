import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaPublicidadModalPage } from './lista-publicidad-modal';

@NgModule({
  declarations: [
    ListaPublicidadModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaPublicidadModalPage),
  ],
})
export class ListaPublicidadModalPageModule {}
