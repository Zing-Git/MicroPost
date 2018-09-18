import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Provincia } from '../../modelo/provincia';
import { AuxiliarProvider } from '../../providers/auxiliar/auxiliar';
import { Comercio } from '../../modelo/comercio';
import { LocationSelectPage } from '../location-select/location-select';

@IonicPage()
@Component({
  selector: 'page-configuracion-inicial',
  templateUrl: 'configuracion-inicial.html',
})
export class ConfiguracionInicialPage {

  inicial: string = 'Domicilio';
  domicilioForm: FormGroup;
  clienteViewModel: Comercio = new Comercio();

  provincias: Provincia[];
  localidades: string[];
  provinciaName: string;
  localidadName: string;

  public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
}

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private auxiliar: AuxiliarProvider,
    public modalCtrl: ModalController) {

    this.clienteViewModel = navParams.get('data');

    this.domicilioForm = this.formBuilder.group({
      provincia: ['', Validators.required],
      localidad: ['', Validators.required],
      departamento: [''],
      barrio: [''],
      calle: ['', Validators.required],
      numeroCasa: ['', Validators.required],
      piso: [''],
      codigoPostal: ['']
    });

  }

  ionViewDidLoad() {
    this.cargarControlesCombos();

  }

  cargarControlesCombos() {
    this.auxiliar.postGetCombos().subscribe(result => {
      this.provincias = result['respuesta'].provincias;
    });
  }

  onProvinciaChange(ctxt: string): void {
    let prov = this.provincias.filter(item => item.iso_31662 === ctxt);
    prov.forEach(element => {
      this.localidades = element.localidad
    });
    this.provinciaName = prov[0].provincia;
  }

  onLocalidadChange(localidad: string): void {
    this.localidadName = localidad;
  }


  volver() {
    this.navCtrl.pop();
  }

  launchLocationPage() {
    /*let modal = this.modalCtrl.create(LocationSelectPage);
    modal.onDidDismiss((location) => {
       console.log(location);
    });
    modal.present();   
*/
  }

  showSelection() {

  }
}
