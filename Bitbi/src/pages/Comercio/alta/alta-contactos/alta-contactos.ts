import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
//import { Comercio } from '../../../modelo/comercio';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AltaLoginPage } from '../alta-login/alta-login';


@IonicPage()
@Component({
  selector: 'page-alta-contactos',
  templateUrl: 'alta-contactos.html',
})
export class AltaContactosPage {

  credencialesForm: FormGroup;
  clienteViewModel: any;

  //variables
  tipoContacto: string;
  email: string = ' ';
  codigoPaisCelular: string;
  codigoAreaCelular: string;
  numeroCelular: string = ' ';
  codigoPaisFijo: string;
  codigoAreaFijo: string = ' ';
  numeroFijo: string;

  constructor(public navParams: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public formBuilder: FormBuilder) {

    this.clienteViewModel = navParams.get('data');

    this.credencialesForm = this.formBuilder.group({
      email: ['', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
      codigoPaisCelular: [''],
      codigoAreaCelular: [''],
      numeroCelular: [''],
      codigoPaisFijo: [''],
      codigoAreaFijo: [''],
      numeroFijo: ['']
    });
  }

  ionViewDidLoad() {

  }

  onSingin() {

    this.clienteViewModel.contactos = new Array();
    if (this.credencialesForm.controls['email'].value != ' ') {

      this.clienteViewModel.contactos.push(
        "Email",
        this.credencialesForm.controls['email'].value
      )
    }
    if (this.credencialesForm.controls['numeroCelular'].value != ' ') {

      this.clienteViewModel.contactos.push(
        "Telefono Celular",
        this.credencialesForm.controls['codigoPaisCelular'].value,
        this.credencialesForm.controls['codigoAreaCelular'].value,
        this.credencialesForm.controls['numeroCelular'].value
      )
    }

    if (this.credencialesForm.controls['numeroFijo'].value != ' ') {

      this.clienteViewModel.contactos.push(
        "Telefono Fijo",
        this.credencialesForm.controls['codigoPaisFijo'].value,
        this.credencialesForm.controls['codigoAreaFijo'].value,
        this.credencialesForm.controls['numeroFijo'].value
      )
    }
    console.log(this.clienteViewModel);
    this.navCtrl.push(AltaLoginPage,
      { data: this.clienteViewModel });
  }

}
