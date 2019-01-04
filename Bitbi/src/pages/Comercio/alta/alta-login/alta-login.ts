import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, NavController, ModalController, LoadingController, App, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../../../modelo/usuario';
import { Persona } from '../../../../modelo/persona';

//import { LoginPage } from '../../../login/login';
import { Comercio } from '../../../../modelo/comercio';
import { ComercioProvider } from '../../../../providers/comercio/comercio';
import Swal from 'sweetalert2';
import { MyApp } from './../../../../app/app.component';
import { HomePage } from './../../../home/home';
import { LoginPage } from './../../../login/login';

@IonicPage()
@Component({
  selector: 'page-alta-login',
  templateUrl: 'alta-login.html',
})
export class AltaLoginPage {

  strings: Array<string>;
  selected: string;
  loginForm: FormGroup;
  clienteViewModel: Comercio = new Comercio();
  isCorrect: boolean = false;

  constructor(public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private comercioService: ComercioProvider,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public appCtrl: App,
    private event: Events ) {

    this.clienteViewModel = navParams.get('data');
    console.log('estoy en alta login');
    console.log(this.clienteViewModel);
    this.loginForm = this.formBuilder.group({
      dni: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      clave: ['', Validators.required],
      reClave: ['', Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaLoginPage');
  }

  onSingin() {

    const loader = this.loadingCtrl.create({
      content: "Por favor Espere unos segundos...",
      duration: 15000
    });
    loader.present();

    //para pobtener los valores cargos en la vista
    if (this.loginForm.controls['clave'].value === this.loginForm.controls['reClave'].value) {
      let usuario = new Usuario(
        new Persona("DNI", this.loginForm.controls['dni'].value),
        this.loginForm.controls['nombreUsuario'].value,
        this.loginForm.controls['clave'].value
      );

      let usuarios = new Array<Usuario>();
      usuarios.push(usuario);

      this.clienteViewModel.usuarios = usuarios;
      this.guardarCliente();

      /*  let miModal = this.modalCtrl.create(mensaje);
       miModal.present(); */
      //this.navCtrl.popToRoot()

      loader.dismiss();
    } else {

      Swal('Atención', 'Las credenciales no coinciden', 'warning')
      loader.dismiss();
    }

  }

  guardarCliente() {
    this.comercioService.postComercio(this.clienteViewModel).subscribe(result => {
      console.log(result);
      if (result['ok'] !== true) {
        Swal('Atención', 'Ocurrio un problema, compruebe que los datos ingresados estan correctos', 'warning')
      } else {
        Swal('Felicidades', 'Ya puede ingresar con sus credenciales', 'success')
        //this.navCtrl.setRoot(LoginPage, { animate: true });
        //this.navCtrl.popToRoot();
        //this.navCtrl.push(LoginPage, {})
        this.event.publish('volverAContacto', 'login');
        this.navCtrl.pop();

      }
    }, err => {
      alert('Hubo un problema al crear Comercio');
    });
  }

  mensajeLuegoCrear() {
    console.log('aqui crear el popup de exito o fracaso');
  }

}
