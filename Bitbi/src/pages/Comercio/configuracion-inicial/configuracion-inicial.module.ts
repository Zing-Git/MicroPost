import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfiguracionInicialPage } from './configuracion-inicial';

@NgModule({
  declarations: [
    ConfiguracionInicialPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfiguracionInicialPage),
  ],
})
export class ConfiguracionInicialPageModule {}
