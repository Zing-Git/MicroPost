import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginPage } from './../login';

 
@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})

export class RegistroPage{

  credencialesForm: FormGroup;
  
    urlCall: string;
    constructor(private formBuilder: FormBuilder, public navCtrl: NavController){

      this.credencialesForm = this.formBuilder.group({
        proveedor: ['', Validators.required],
        rubro: [' ', Validators.required],
        celular: [' '],
        direccion: [' ', Validators.required],
        email :[' ', Validators.required],
        mensaje: [' ']
      });


    }

    dismiss() {

      
      let proveedor= this.credencialesForm.controls['proveedor'].value;
      let rubro = this.credencialesForm.controls['rubro'].value;
      let celular = this.credencialesForm.controls['celular'].value;
      let direccion = this.credencialesForm.controls['direccion'].value;
      let email = this.credencialesForm.controls['email'].value;
      let mensaje = this.credencialesForm.controls['mensaje'].value;
  
      let info = proveedor + ' - ' + rubro + ' - ' + celular + ' - ' + direccion + ' - ' + email + ' - ' + mensaje
      let api: string = 'https://wa.me/'; //https://api.whatsapp.com/send?phone=
      let miMensaje = info.split(' ').join('%20')
      this.urlCall = api + '5493886001968' + '/?text=' + miMensaje;
window.open(this.urlCall);
     // this.viewCtrl.dismiss(info);
  
    }

    volver() {
      this.navCtrl.setRoot(LoginPage);
      this.navCtrl.popToRoot();
    }
    
}