import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Provincia } from '../../modelo/provincia';
import { AuxiliarProvider } from '../../providers/auxiliar/auxiliar';
import { Domicilio } from '../../modelo/domicilio';
import { AltaLoginPage } from '../alta-login/alta-login';
import { Comercio } from '../../modelo/comercio';
/**
 * Generated class for the AltaDomicilioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alta-domicilio',
  templateUrl: 'alta-domicilio.html',
})
export class AltaDomicilioPage {

  combos: any[];
  selected : string;
  domicilioForm: FormGroup;
  datos: any;
  provincias: Provincia[];
  localidades: string[];
  clienteViewModel : Comercio = new Comercio();
  provinciaName: string;
  localidadName:string;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private formBuilder: FormBuilder,
            private auxiliar: AuxiliarProvider) {
             
    this.clienteViewModel = navParams.get('data');
   
    this.domicilioForm = this.formBuilder.group({
      provincia: ['',Validators.required],
      localidad: ['',Validators.required],
      barrio:[''],
      calle:['',Validators.required],
      numeroCasa:['',Validators.required],
      codigoPostal:['']
    });
    
    
  }

  ionViewDidLoad() {
    this.cargarControlesCombos();
  }  

  onSingin() {
    this.clienteViewModel.domicilio = new Domicilio(
        this.provinciaName,
        this.localidadName,
        this.domicilioForm.controls['barrio'].value,
        this.domicilioForm.controls['calle'].value,
        this.domicilioForm.controls['numeroCasa'].value,
        this.domicilioForm.controls['codigoPostal'].value
    );
    
    console.log(this.clienteViewModel);   // control de alta de domicilio

    this.navCtrl.push(AltaLoginPage, { data: this.clienteViewModel});
  }

  cargarControlesCombos() {
    this.auxiliar.postGetCombos().subscribe(result => {    
      this.provincias = result['respuesta'].provincias;       
    });

  }

  onChange() {
    let prov =  this.provincias.find(x => x.provincia === this.domicilioForm.get('provincia').value);
    console.log(this.domicilioForm.controls['provincia'].value);
    this.domicilioForm.controls['provincia'].value
    this.localidades = prov.localidad;
  }

  onProvinciaChange(ctxt: string): void {
    let prov = this.provincias.filter(item => item.iso_31662 === ctxt); 
    prov.forEach(element =>{
      this.localidades = element.localidad
    });
    this.provinciaName = prov[0].provincia;
    //console.log(this.provinciaName);
  }

  onLocalidadChange(localidad: string):void{
    //console.log(ctxt);
    this.localidadName = localidad;
  }

}
