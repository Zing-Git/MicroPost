import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, NavController, ModalController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../../../modelo/usuario';
import { Persona } from '../../../../modelo/persona';
import { ProveedorProvider } from '../../../../providers/proveedor/proveedor';
import { LoginPage } from '../../../login/login';
import { Comercio } from '../../../../modelo/comercio';
import Swal from 'sweetalert2';

@IonicPage()
@Component({
  selector: 'page-alta-proveedor-login',
  templateUrl: 'alta-proveedor-login.html',
})
export class AltaProveedorLoginPage {

  strings: Array<string>;
  selected: string;
  loginForm: FormGroup;
  clienteViewModel: Comercio = new Comercio();
  isCorrect: boolean = false;

  constructor(public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private proveedorServices: ProveedorProvider,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController) {

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
    const loader = this.loadingCtrl.create({
      content: "Por favor Espere unos segundos..."
    });
    loader.present();

    if (this.loginForm.controls['clave'].value === this.loginForm.controls['reClave'].value) {
      let usuario = new Usuario(
        new Persona("DNI", this.loginForm.controls['dni'].value),
        this.loginForm.controls['nombreUsuario'].value,
        this.loginForm.controls['clave'].value
      );

      let usuarios = new Array<Usuario>();
      usuarios.push(usuario);
      this.clienteViewModel.usuarios = usuarios;

      this.proveedorServices.postProveedor(this.clienteViewModel).subscribe(result => {
        if (result.ok == true) {

          loader.dismiss();
          Swal('Felicidades!!', 'Ahora puede ingresar con usuario y clave al sistema..', 'success')
          //this.navCtrl.push(LoginPage);
          this.navCtrl.setRoot(LoginPage, { animate: true });
              this.navCtrl.popToRoot();
        } else {

          loader.dismiss();
          Swal('Atención!!', result.message, 'error')
          
        }
       

      }, err => {
        loader.dismiss();
        Swal('Atención!!', err, 'error')
      });

      /*  let miModal = this.modalCtrl.create(mensaje);
       miModal.present(); */
      //this.navCtrl.popToRoot()


    } else {
      loader.dismiss();
      Swal('Atención!!', 'Las credenciales no coinciden, vuelva a ingresar', 'error')
    }

  }

}
