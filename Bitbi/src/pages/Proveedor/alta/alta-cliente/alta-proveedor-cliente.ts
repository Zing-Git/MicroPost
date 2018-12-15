import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Provincia } from '../../../../modelo/provincia';
import { TiposPersoneria } from '../../../../modelo/tiposPersoneria';
import { Comercio } from '../../../../modelo/comercio';
import { AuxiliarProvider } from '../../../../providers/auxiliar/auxiliar';
import { Entidad } from '../../../../modelo/entidad';
import { AltaProveedorDomicilioPage } from '../alta-domicilio/alta-proveedor-domicilio';
import { ActividadesPrincipalesProveedor } from '../../../../modelo/actividadesPrincipalesProveedor';

@IonicPage()
@Component({
  selector: 'page-alta-proveedor-cliente',
  templateUrl: 'alta-proveedor-cliente.html',
})
export class AltaProveedorClientePage {

  //strings: Array<string>;
  //selected: string;
  credencialesForm: FormGroup;
  provincias: Provincia[];
  actividadesPrincipalesProveedor: ActividadesPrincipalesProveedor[];
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
    private auxiliar: AuxiliarProvider) {

    this.cargarControlesCombos();

    this.credencialesForm = this.formBuilder.group({
      cuil: ['', Validators.required],
      razonSocial: ['', Validators.required],
      actividadPrincipal: [this.itemActividadSelected],
      tipoPersoneria: [this.itemPersoneriaSelected, Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('Estoy en Cliente');

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
    this.navCtrl.push(AltaProveedorDomicilioPage,
      { data: this.clienteViewModel });
  }

  cargarControlesCombos() {

    this.auxiliar.postGetCombos().subscribe(result => {
      this.tiposPersoneria = result['respuesta'].tiposPersoneria;
      this.itemPersoneriaSelected = this.tiposPersoneria[0].orden || 1;

      this.actividadesPrincipalesProveedor = result['respuesta'].actividadesPrincipalesProveedor;
      this.itemActividadSelected = this.actividadesPrincipalesProveedor[0].orden || 1;

      this.tipoPersoneriaName = this.tiposPersoneria[0].tipoPersoneria;
      this.actividadPrincipalName = this.actividadesPrincipalesProveedor[0].nombre;
    });

  }

  onTipoPersoneriaChange(ctxt: string): void {
    const tipoPersoneria = this.tiposPersoneria.filter(item => item.orden === +ctxt);
    this.tipoPersoneriaName = tipoPersoneria[0].tipoPersoneria;
  }

  onActividadesPrincipalesClienteChange(ctxt: string): void {
    const actividadPrincipal = this.actividadesPrincipalesProveedor.filter(item => item.orden === +ctxt);
    this.actividadPrincipalName = actividadPrincipal[0].nombre;
  }

}
