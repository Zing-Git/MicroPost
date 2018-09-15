import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Provincia } from '../../modelo/provincia';
import { ActividadesPrincipalesComercio } from '../../modelo/actividadesPrincipalesComercio';
import { TiposPersoneria } from '../../modelo/tiposPersoneria';
import { Comercio } from '../../modelo/comercio';
import { AuxiliarProvider } from '../../providers/auxiliar/auxiliar';
import { Entidad } from '../../modelo/entidad';
import { AltaDomicilioPage } from '../alta-domicilio/alta-domicilio';

/**
 * Generated class for the AltaClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alta-cliente',
  templateUrl: 'alta-cliente.html',
})
export class AltaClientePage {
  
  strings : Array<string>;
  selected : string;
  credencialesForm: FormGroup;
  provincias : Provincia[]; 
  actividadesPrincipalesComercio : ActividadesPrincipalesComercio[];
  tiposPersoneria : TiposPersoneria[];
  clienteViewModel : Comercio = new Comercio();
  actividadPrincipalName: string;
  tipoPersoneriaName: string;

  constructor(public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    private auxiliar: AuxiliarProvider) {

      this.credencialesForm = this.formBuilder.group({
        cuil: ['',Validators.required],
        razonSocial: ['',Validators.required],
        actividadPrincipal:[''],
        tipoPersoneria:['',Validators.required]
  });
  }

  ionViewDidLoad() {
    console.log('Estoy en Cliente');
    this.cargarControlesCombos();
  }

  onSingin() {

    this.clienteViewModel.entidad = new
    Entidad(
      this.credencialesForm.controls['cuil'].value,
      this.credencialesForm.controls['razonSocial'].value,
      this.actividadPrincipalName,
      this.tipoPersoneriaName
    );

    console.log(this.clienteViewModel);    //para control 
    this.navCtrl.push(AltaDomicilioPage, 
                  { data: this.clienteViewModel});
  }

  cargarControlesCombos() {

    this.auxiliar.postGetCombos().subscribe(result => {    
      this.tiposPersoneria = result['respuesta'].tiposPersoneria;      
      this.actividadesPrincipalesComercio = result['respuesta'].actividadesPrincipalesComercio;  
    });
    
  }

  onTipoPersoneriaChange(ctxt: string): void {    
    const tipoPersoneria = this.tiposPersoneria.filter(item => item.orden === +ctxt); 
    this.tipoPersoneriaName= tipoPersoneria[0].tipoPersoneria;
  }

  onActividadesPrincipalesClienteChange(ctxt: string): void{
    const actividadPrincipal = this.actividadesPrincipalesComercio.filter(item => item.orden === +ctxt);
    this.actividadPrincipalName = actividadPrincipal[0].nombre;
  }

}
