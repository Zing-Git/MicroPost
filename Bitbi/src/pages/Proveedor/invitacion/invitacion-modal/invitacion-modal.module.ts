import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvitacionModalPage } from './invitacion-modal';

@NgModule({
  declarations: [
    InvitacionModalPage,
  ],
  imports: [
    IonicPageModule.forChild(InvitacionModalPage),
  ],
})
export class InvitacionModalPageModule {}
