import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { File, FileEntry } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { envirotment as ENV } from '../../../environments/environment';
import { AuxiliarProvider } from '../../../providers/auxiliar/auxiliar';
declare var cordova: any;
import Swal from 'sweetalert2';
import { normalizeURL } from 'ionic-angular';
import { DatePipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-crear-publicidad',
  templateUrl: 'crear-publicidad.html',
})
export class CrearPublicidadPage {

  public base64Image: string; //aqui vamos a almacenar la imagen
  public pathDeImagen: string;  //este es el path de la imagen
  public otro: string;
  fechaInicio: string = new Date().toISOString();
  fechaFin: string = new Date().toISOString();
  fechaMinima: Date = new Date();
  descripcion: string;
  dias: number;
  imageSrc: string;
  titulo: string;
  correctPath: string;
  lastImage: string = null;
  currentName: string;

  constructor(public navCtrl: NavController,
    public platform: Platform,
    public navParams: NavParams,
    private camera: Camera,
    private filePath: FilePath,
    private file: File,
    private transfer: Transfer,
    public loadingCtrl: LoadingController,
    private auxliar: AuxiliarProvider,
    private datePipe: DatePipe) {


    this.fechaMinima.setDate(this.fechaMinima.getDate() + 1);
    this.fechaInicio = this.fechaMinima.toISOString();
    this.fechaFin = this.fechaMinima.toISOString();
  }

  tomarFoto() {

    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 500,
      targetWidth: 500,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.lastImage = imageData;
    }, (err) => {
      // Handle error
    });
  }

  tomarDeGaleria() {
    let cameraOptions = {
      sourceType: 0,//this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 50,
      targetWidth: 500,
      targetHeight: 500,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    this.camera.getPicture(cameraOptions).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.lastImage = imageData;


    })



  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearPublicidadPage');
  }

  enviarPublicidad() {
    console.log(this.fechaInicio);
    console.log(this.fechaFin);
    console.log(ENV.PROVEEDOR_ID);
    const loader = this.loadingCtrl.create({
      content: "Subiendo Publicidad, espere unos segundos..."
    });
    loader.present();
    this.auxliar.postCrearPublicidad(this.lastImage, this.descripcion, ENV.PROVEEDOR_ID, this.datePipe.transform(this.fechaInicio,"yyyy-MM-dd"), this.datePipe.transform(this.fechaFin,"yyyy-MM-dd"), this.titulo).subscribe(result => {
      if (result.ok == true) {
        loader.dismiss();
        Swal('Felicidades', result.message, 'success');
        this.navCtrl.setRoot(CrearPublicidadPage);
        this.navCtrl.popToRoot();
      } else {
        loader.dismiss();
        Swal('Error', result.message, 'error');
      }


    })

  }

  

}
