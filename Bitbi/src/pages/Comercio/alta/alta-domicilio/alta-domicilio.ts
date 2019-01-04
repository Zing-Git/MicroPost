import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Provincia } from '../../../../modelo/provincia';
import { AuxiliarProvider } from '../../../../providers/auxiliar/auxiliar';
import { Domicilio } from '../../../../modelo/domicilio';
import { Comercio } from '../../../../modelo/comercio';
import { AltaContactosPage } from '../alta-contactos/alta-contactos';

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
            private auxiliar: AuxiliarProvider,
            public loadingCtrl: LoadingController,
            private event: Events) {
             
    this.clienteViewModel = navParams.get('data');
   
    this.domicilioForm = this.formBuilder.group({
      provincia: ['',Validators.required],
      localidad: ['',Validators.required],
      barrio:[''],
      calle:['',Validators.required],
      numeroCasa:['',Validators.required],
      codigoPostal:['']
    });
    
    this.event.subscribe('volverADomicilio', () => {
      this.event.publish('volverACliente', 'login');
      this.navCtrl.pop();
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
    this.navCtrl.push(AltaContactosPage, { data: this.clienteViewModel});
    //console.log(this.clienteViewModel);   // control de alta de domicilio

    //this.presentConfirm();
  }

  cargarControlesCombos() {

    const loader = this.loadingCtrl.create({
      content: "Por favor Espere unos segundos...",
      duration: 15000
     
    });
    loader.present();

    this.auxiliar.postGetCombos().subscribe(result => { 
         console.log(result);
      this.provincias = result['respuesta'].provincias;       
      this.provinciaName = this.provincias[0].provincia
    });

    loader.dismiss();
  }

  onChange() {
    let prov =  this.provincias.find(x => x.provincia === this.domicilioForm.get('provincia').value);
    console.log(this.domicilioForm.controls['provincia'].value);
    this.domicilioForm.controls['provincia'].value
    this.localidades = prov.localidad;
  }

  onProvinciaChange(ctxt: string): void {
    let prov = this.provincias.filter(item => item.iso_31662 === ctxt); 
    console.log(prov);
    if(prov.length > 0){
      prov.forEach(element =>{
      this.localidades = element.localidad
    });
    this.provinciaName = prov[0].provincia;
    }
    
    
  }

  onLocalidadChange(localidad: string):void{
    this.localidadName = localidad;
  }


}
