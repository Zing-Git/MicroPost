import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ViewController, App } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuxiliarProvider } from '../../../providers/auxiliar/auxiliar';
import { ProveedorProvider } from '../../../providers/proveedor/proveedor';
import { envirotment as ENV } from '../../../environments/environment';
import Swal from 'sweetalert2';

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
  estado: boolean = true;

  pedidos: any;
  idProveedor: string;
  callback: any;

  invitaciones: any[] = new Array();
  invitacionesAceptadas: any[] = new Array();
  invitacionesRechazadas: any[] = new Array();
  invitacionesPendientes: any[] = new Array();

  direciones: any;
  permitirRefresh: boolean = false;

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
      console.log(data['invitaciones']);
      if (data['invitaciones'] != undefined) {
        ENV.INVITACIONES = JSON.stringify(data['invitaciones']);
        this.estado = true;
        this.cargarCombos();
        
      }
      else {
       this.estado = false;
      }

    });
loader.dismiss();

  }

  cargarCombos() {
    this.invitacionesAceptadas = new Array();
    this.invitacionesRechazadas = new Array();
    this.invitacionesPendientes = new Array();
    this.estadoAceptado = true;
    this.estadoPendiente = true;
    this.estadoRechazado = true;

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

  doRefresh(refresher?:any) { //"?" in typescript means the parameter is optional

      this.obtenerDatosImportantes();
      refresher && refresher.complete();//make sure refresher is truthy before calling complete
   
  }

  ionViewDidLoad() {

  }

  aceptar(invitacion: any) {


    Swal({

      text: 'Desea Aceptar Invitacion?',
      type: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, ACEPTAR!',
      confirmButtonColor: '#488aff',
      cancelButtonColor: '#488aff',
      reverseButtons: true

    }).then((result) => {

      if (result.value) {
        const loader = this.loadingCtrl.create({
          content: "Procesando Información, aguarde unos segundos, Gracias..."
        });
        loader.present();
        this.proveedorServices.postAceptarRechazar(invitacion._id, true).subscribe(result => {

          if (typeof result != 'undefined') {
            if (result.ok) {
              Swal({
                title: 'Felicidades',
                text: 'Acabas de agregar un comercio más a tu red de puntos de venta. Bitbi te ayuda a crecer',
                type: 'success',
                showCancelButton: false,
                confirmButtonText: 'GRACIAS!',
                confirmButtonColor: '#488aff'
              }

              );

            
              loader.dismiss();
            } else {
              Swal(
                'Advertencia',
                result.message,
                'error'
              )
              loader.dismiss();
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
      cancelButtonText: 'Volver',
      confirmButtonText: 'Si, RECHAZAR!',
      confirmButtonColor: '#488aff',
      cancelButtonColor: '#488aff',
      reverseButtons: true

    }).then((result) => {


      if (result.value) {
        const loader = this.loadingCtrl.create({
          content: "Procesando Información, aguarde unos segundos, Gracias..."
        });
        loader.present();
        this.proveedorServices.postAceptarRechazar(invitacion._id, false).subscribe(result => {
          if (typeof result != 'undefined') {

            if (result.ok) {
              Swal(
                'Realizado!',
                result.message,
                'success'
              );              
                loader.dismiss();
            } else {
              Swal(
                'Advertencia',
                result.message,
                'error'
              )
              loader.dismiss();
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
