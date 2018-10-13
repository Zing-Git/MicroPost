import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ViewController, App } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuxiliarProvider } from '../../../providers/auxiliar/auxiliar';
import { ProveedorProvider } from '../../../providers/proveedor/proveedor';
import { envirotment as ENV } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { CrearPublicidadPage } from '../../publicidad/crear-publicidad/crear-publicidad';

@IonicPage()
@Component({
  selector: 'page-listado-invitacion',
  templateUrl: 'listado-invitacion.html',
})
export class ListadoInvitacionPage {

  pedido: any;
  inicial: string = 'pendiente';
  pedidoForm: FormGroup;
  cantidadProductos: number = 0;

  estadoAceptado: boolean = true;
  estadoRechazado: boolean = true;
  estadoPendiente: boolean = true;

  pedidos: any;
  idProveedor: string;
  callback: any;

  invitaciones: any[] = new Array();
  invitacionesAceptadas: any[] = new Array();
  invitacionesRechazadas: any[] = new Array();
  invitacionesPendientes: any[] = new Array();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public auxiliar: AuxiliarProvider,
    public proveedorServices: ProveedorProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public appCtrl: App) {

    this.obtenerDatosImportantes();
  }

  obtenerDatosImportantes() {

    this.idProveedor = ENV.PROVEEDOR_ID;

    const loader = this.loadingCtrl.create({
      content: "Por favor Espere unos segundos..."

    });
    loader.present();
    this.proveedorServices.getInvitaciones(this.idProveedor).subscribe(data => {
      if (data['invitaciones'] != undefined) {
        ENV.INVITACIONES = JSON.stringify(data['invitaciones']);
        console.log(ENV.INVITACIONES);
        this.cargarCombos();
        loader.dismiss();
      }
      else {
        loader.dismiss();
        Swal(
          'Atencion',
          'No hay invitaciones pendientes',
          'warning'
        );
      }

    });

    
  }

  cargarCombos() {
    this.invitacionesAceptadas = new Array();
    this.invitacionesRechazadas = new Array();
    this.invitacionesPendientes = new Array();

    this.invitaciones = this.auxiliar.crearArray(JSON.parse(ENV.INVITACIONES));

    this.invitaciones.forEach(x => {
      if (x.pendienteDeRevision == true) {
        this.estadoPendiente = false;
        this.invitacionesPendientes.push(x);
      } else {
        if (x.aceptada == true) {
          this.estadoAceptado = false;
          this.invitacionesAceptadas.push(x);
        } else {
          this.estadoRechazado = false;
          this.invitacionesRechazadas.push(x);
        }
      }
    })
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      //this.obtenerDatosImportantes();
      refresher.complete();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoInvitacionPage');
  }

  aceptar(invitacion: any) {


    Swal({

      text: 'Desea Aceptar Invitacion?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, ACEPTAR!',
      confirmButtonColor: '#063079',
      cancelButtonColor: '#f53d3d',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      
      if (result.value) {
       
        this.proveedorServices.postAceptarRechazar(invitacion._id, true).subscribe(result => {
          console.log(invitacion);
          console.log(result);
          if (typeof result != 'undefined') {
  
            if (result.ok) {
              Swal(
                'Felicidades',
                result.message,
                'success'
              );
  
              const loader = this.loadingCtrl.create({
                content: "Actualizando Informacion, aguarde unos segundos...",
                duration: 3000
              });
              loader.present();
  
            } else {
              Swal(
                'Advertencia',
                result.message,
                'error'
              )
            }
          }
        })

        this.actualizarInvitacion(invitacion._id, true);
      }
 
    })
  }

  rechazar(invitacion: any) {


    Swal({

      text: 'Desea Rechazar Invitacion?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, RECHAZAR!',
      confirmButtonColor: '#063079',
      cancelButtonColor: '#f53d3d',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      
      
      if (result.value) {
        
        this.proveedorServices.postAceptarRechazar(invitacion._id, false).subscribe(result => {
          console.log(invitacion);
          console.log(result);
          if (typeof result != 'undefined') {
  
            if (result.ok) {
              Swal(
                'Atención!',
                result.message,
                'success'
              );
  
              const loader = this.loadingCtrl.create({
                content: "Actualizando Informacion, aguarde unos segundos...",
                duration: 3000
              });
              loader.present();
  
            } else {
              Swal(
                'Advertencia',
                result.message,
                'error'
              )
            }
          }
        })
  
  
        this.actualizarInvitacion(invitacion._id, false);
      }
      
      
    })
  }

  actualizarInvitacion(idInvitacion, value): void {

    this.invitaciones.forEach(x => {
      if (x._id === idInvitacion) {
        x.aceptada = value;
        x.pendienteDeRevision = false;
      }
    })

    ENV.INVITACIONES = JSON.stringify(this.auxiliar.crearArray(this.invitaciones));
    this.cargarCombos();

  }


}
