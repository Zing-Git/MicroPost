import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoInvitacionPage } from './listado-invitacion';

@NgModule({
  declarations: [
    ListadoInvitacionPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoInvitacionPage),
  ],
})
export class ListadoInvitacionPageModule {}
