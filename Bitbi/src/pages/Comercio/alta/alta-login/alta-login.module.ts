import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AltaLoginPage } from './alta-login';

@NgModule({
  declarations: [
    AltaLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(AltaLoginPage),
  ],
})
export class AltaLoginPageModule {}
