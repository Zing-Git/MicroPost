import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaProveedoresModalPage } from './lista-proveedores-modal';

@NgModule({
  declarations: [
    ListaProveedoresModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaProveedoresModalPage),
  ],
})
export class ListaProveedoresModalPageModule {}
