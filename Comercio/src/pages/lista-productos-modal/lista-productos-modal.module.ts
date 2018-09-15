import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaProductosModalPage } from './lista-productos-modal';

@NgModule({
  declarations: [
    ListaProductosModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaProductosModalPage),
  ],
})
export class ListaProductosModalPageModule {}
