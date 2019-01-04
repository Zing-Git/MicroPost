import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Provincia } from '../../../../modelo/provincia';
import { ActividadesPrincipalesComercio } from '../../../../modelo/actividadesPrincipalesComercio';
import { TiposPersoneria } from '../../../../modelo/tiposPersoneria';
import { Comercio } from '../../../../modelo/comercio';
import { AuxiliarProvider } from '../../../../providers/auxiliar/auxiliar';
import { Entidad } from '../../../../modelo/entidad';
import { AltaDomicilioPage } from '../alta-domicilio/alta-domicilio';
import { LoginPage } from '../../../login/login';

@IonicPage()
@Component({
  selector: 'page-alta-cliente',
  templateUrl: 'alta-cliente.html',
})
export class AltaClientePage {

  strings: Array<string>;
  selected: string;
  credencialesForm: FormGroup;
  provincias: Provincia[];
  actividadesPrincipalesComercio: ActividadesPrincipalesComercio[];
  tiposPersoneria: TiposPersoneria[];
  clienteViewModel: Comercio = new Comercio();
  actividadPrincipalName: string;
  tipoPersoneriaName: string;
  itemPersoneriaSelected: number;
  itemActividadSelected: number;
  value: number;

  constructor(public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    private auxiliar: AuxiliarProvider,
    public loadingCtrl: LoadingController,
    private event: Events) {

    this.cargarControlesCombos();


    this.credencialesForm = this.formBuilder.group({
      cuil: [''],
      razonSocial: ['', Validators.required],
      actividadPrincipal: [this.itemActividadSelected],
      tipoPersoneria: [this.itemPersoneriaSelected, Validators.required],
      actividadPrincipalOtro: ['']
    });

    this.event.subscribe('volverACliente', () => {
      this.event.publish('volverALogin', 'login');
      this.navCtrl.pop();
    });
  }

  ionViewDidLoad() {


  }

  onSingin() {

    let fecha = new Date();
        fecha.setDate(fecha.getDate() + 1);
    var cuil: string = 'Sin Cuil - ' + fecha.toISOString();
    if (this.value == 1) {
      this.actividadPrincipalName = this.credencialesForm.controls['actividadPrincipalOtro'].value;
    }

    console.log( this.credencialesForm.controls['cuil'].value);
    if(this.credencialesForm.controls['cuil'].value){ 
      cuil = this.credencialesForm.controls['cuil'].value;
    }
    this.clienteViewModel.entidad = new
      Entidad(
        cuil,
        this.credencialesForm.controls['razonSocial'].value,
        this.actividadPrincipalName,
        this.tipoPersoneriaName
      );
        console.log(this.clienteViewModel);
    this.navCtrl.push(AltaDomicilioPage,
      { data: this.clienteViewModel });
  }

  cargarControlesCombos() {

    const loader = this.loadingCtrl.create({
      content: "Por favor Espere unos segundos...",
      duration: 15000
    });
    loader.present();

    this.auxiliar.postGetCombos().subscribe(result => {
      this.tiposPersoneria = result['respuesta'].tiposPersoneria;
      this.actividadesPrincipalesComercio = result['respuesta'].actividadesPrincipalesComercio;
      this.itemPersoneriaSelected = this.tiposPersoneria[0].orden || 1;
      this.itemActividadSelected = this.actividadesPrincipalesComercio[0].orden || 1;

      this.tipoPersoneriaName = this.tiposPersoneria[0].tipoPersoneria;
      this.actividadPrincipalName = this.actividadesPrincipalesComercio[0].nombre;
    });
    loader.dismiss();
  }


  onTipoPersoneriaChange(ctxt: string): void {
    const tipoPersoneria = this.tiposPersoneria.filter(item => item.orden === +ctxt);
    this.tipoPersoneriaName = tipoPersoneria[0].tipoPersoneria;
  }

  onActividadesPrincipalesClienteChange(ctxt: string): void {
    if (+ctxt === 1000) {
      this.value = 1;
      //this.actividadPrincipalName = ''
    } else {
      this.value = 0;

      const actividadPrincipal = this.actividadesPrincipalesComercio.filter(item => item.orden === +ctxt);
      this.actividadPrincipalName = actividadPrincipal[0].nombre;

    }

  }

  volver(): void {
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }
  
}
