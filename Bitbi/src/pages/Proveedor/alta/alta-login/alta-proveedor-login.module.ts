import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AltaProveedorLoginPage } from './alta-proveedor-login';

@NgModule({
  declarations: [
    AltaProveedorLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(AltaProveedorLoginPage),
  ],
})
export class AltaProveedorLoginPageModule {}
