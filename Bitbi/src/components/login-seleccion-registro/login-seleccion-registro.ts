import { Component } from '@angular/core';

/**
 * Generated class for the LoginSeleccionRegistroComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login-seleccion-registro',
  templateUrl: 'login-seleccion-registro.html'
})
export class LoginSeleccionRegistroComponent {

  text: string;

  constructor() {
    console.log('Hello LoginSeleccionRegistroComponent Component');
    this.text = 'Hello World';
  }

}
