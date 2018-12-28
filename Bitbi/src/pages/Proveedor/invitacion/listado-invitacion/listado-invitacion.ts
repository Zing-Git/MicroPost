import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ViewController, App } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuxiliarProvider } from '../../../../providers/auxiliar/auxiliar';
import { ProveedorProvider } from '../../../../providers/proveedor/proveedor';
import { envirotment as ENV } from '../../../../environments/environments';
import Swal from 'sweetalert2';
import { InvitacionModalPage } from './../invitacion-modal/invitacion-modal';

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
  estadoProveedor: boolean = true;
  estado: boolean = true;

  pedidos: any;
  idProveedor: string;
  callback: any;

  invitaciones: any[] = new Array();
  invitacionesAceptadas: any[] = new Array();
  invitacionesRechazadas: any[] = new Array();
  invitacionesPendientes: any[] = new Array();
  invitacionProveedor: any[] = new Array();

  direciones: any;
  permitirRefresh: boolean = false;
  alias: string;
  aceptado: boolean = false;

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
    ENV.INVITACIONES = ' ';
    this.invitaciones = new Array();

    this.idProveedor = ENV.PROVEEDOR_ID;

    const loader = this.loadingCtrl.create({
      content: "Por favor Espere unos segundos..."

    });
    loader.present();
    this.proveedorServices.getInvitaciones(this.idProveedor).subscribe(data => {
      console.log(data['invitaciones']);
      console.log(data);
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
    this.invitacionProveedor = new Array();

    this.estadoAceptado = true;
    this.estadoPendiente = true;
    this.estadoRechazado = true;
    this.estadoPendiente = true;

    this.invitaciones = this.auxiliar.crearArray(JSON.parse(ENV.INVITACIONES));

    this.invitaciones.forEach(x => {
      if (!x.esProveedor) {
        if (x.pendienteDeRevision == true) {
          this.estadoPendiente = false;
          this.invitacionesPendientes.push(x);
        } else {
          if (x.aceptada == true) {
            this.estadoAceptado = false;
            if (this.inicial != 'pendiente') {
              this.inicial = 'aceptado';
            }
            this.invitacionesAceptadas.push(x);
          } else {
            if (this.inicial != 'pendiente') {
              this.inicial = 'rechazado';
            }
            this.estadoRechazado = false;
            this.invitacionesRechazadas.push(x);
          }
        }
      } else {
        this.inicial = 'proveedor';
        this.estadoProveedor = false;
        this.invitacionProveedor.push(x);
      }

    })
  }

  doRefresh(refresher?: any) { //"?" in typescript means the parameter is optional

    this.obtenerDatosImportantes();
    refresher && refresher.complete();//make sure refresher is truthy before calling complete

  }

  ionViewDidLoad() {

  }

  aceptar(invitacion: any) {
    const modal = this.modalCtrl.create(InvitacionModalPage, { data: invitacion, data1: 'aceptado' });
    modal.present();

    modal.onDidDismiss((location) => {
      this.obtenerDatosImportantes();
    });
  }

  rechazar(invitacion: any) {
    const modal = this.modalCtrl.create(InvitacionModalPage, { data: invitacion, data1: 'rechazado' });
    modal.present();

    modal.onDidDismiss((location) => {
      this.obtenerDatosImportantes();
    });
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
