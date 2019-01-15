import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaTodosProveedoresPage } from './lista-todos-proveedores';

@NgModule({
  declarations: [
    ListaTodosProveedoresPage,
  ],
  imports: [
 
  IonicPageModule.forChild(ListaTodosProveedoresPage),
  ],
})
export class ListaTodosProveedoresPageModule {}