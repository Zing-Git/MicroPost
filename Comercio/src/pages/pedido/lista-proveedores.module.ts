import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaProveedoresPage } from './lista-proveedores';

@NgModule({
  declarations: [
    ListaProveedoresPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaProveedoresPage),
  ],
})
export class ListaProveedoresPageModule {}

