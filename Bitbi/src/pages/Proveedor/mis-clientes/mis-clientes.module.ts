import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisClientesPage } from './mis-clientes';

@NgModule({
  declarations: [
    MisClientesPage,
  ],
  imports: [
    IonicPageModule.forChild(MisClientesPage),
  ],
})
export class MisClientesPageModule {}
