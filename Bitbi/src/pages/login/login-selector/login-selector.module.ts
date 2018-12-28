import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginSelectorPage } from './login-selector';

@NgModule({
  declarations: [
    LoginSelectorPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginSelectorPage),
  ],
})
export class LoginSelectorPageModule {}
