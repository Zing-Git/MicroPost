import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Provincia } from '../../../modelo/provincia';
import { AuxiliarProvider } from '../../../providers/auxiliar/auxiliar';
import { Domicilio } from '../../../modelo/domicilio';
import { AltaLoginPage } from '../alta-login/alta-login';
import { Comercio } from '../../../modelo/comercio';
import Swal from 'sweetalert2';

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

    this.presentConfirm();
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
    
  }

  onLocalidadChange(localidad: string):void{
    this.localidadName = localidad;
  }

  presentConfirm() {

    Swal({
      title: 'Bien hecho!',
      text: 'para terminar tu registro solo falta cargar los datos para ingresar a la aplicación',
      type: 'success',
      showCancelButton: true,
      confirmButtonText: 'Si, continuar!',
      cancelButtonText: 'no, gracias'
    }).then((result) => {
      if (result.value) {
        this.navCtrl.push(AltaLoginPage, { data: this.clienteViewModel});
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal(
          'Canelado',
          'Todo Ok, Gracias',
          'error'
        )
        this.navCtrl.pop();  
      }
    })
  }

}
