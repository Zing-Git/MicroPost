import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, NavController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../../modelo/usuario';
import { Persona } from '../../../modelo/persona';

import { LoginPage } from '../../login/login';
import { Comercio } from '../../../modelo/comercio';
import { ComercioProvider } from '../../../providers/comercio/comercio';
import Swal from 'sweetalert2';

@IonicPage()
@Component({
  selector: 'page-alta-login',
  templateUrl: 'alta-login.html',
})
export class AltaLoginPage {

  strings: Array<string>;
  selected: string;
  loginForm: FormGroup;
  clienteViewModel : Comercio = new Comercio();
  isCorrect: boolean = false;

  constructor(public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private comercioService: ComercioProvider,
    public navCtrl: NavController,
    public modalCtrl: ModalController) {

    this.clienteViewModel = navParams.get('data');

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
      this.navCtrl.push(LoginPage);

    } else {
      let miModal = this.modalCtrl.create('Ocurrio un error, Vuelva a intentarlo');
      miModal.present();
      this.navCtrl.setRoot('LoginPage');
    }

  }

  guardarCliente() {
    this.comercioService.postComercio(this.clienteViewModel).subscribe(result => {
      let respuesta = result;
      console.log('respuesta del server: ' + respuesta);
      this.isCorrect = true;
      if(respuesta != undefined){
        
        Swal('Felicidades', 'Ya puede ingresar con sus credenciales' , 'success')
      }

    }, err => {
      alert('Hubo un problema al crear Comercio' + err);
    });
  }

  mensajeLuegoCrear(){
    console.log('aqui crear el popup de exito o fracaso');
  }

}
