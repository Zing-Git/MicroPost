import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaPublicidadPage } from './lista-publicidad';

@NgModule({
  declarations: [
    ListaPublicidadPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaPublicidadPage),
  ],
})
export class ListaPublicidadPageModule {}
