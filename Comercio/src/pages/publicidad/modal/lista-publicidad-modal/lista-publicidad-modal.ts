import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-lista-publicidad-modal',
  templateUrl: 'lista-publicidad-modal.html',
})
export class ListaPublicidadModalPage {
  publicidad: any;
  inicial: string = 'encabezado';
  publicidadForm: FormGroup;
  cantidadProductos : number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {

    this.publicidad = navParams.get('data');
    if (this.publicidad != undefined) {
     
      console.log(this.publicidad);
      
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPublicidadModalPage');
  }
  
  volver(){
    this.navCtrl.pop();
  }
}
