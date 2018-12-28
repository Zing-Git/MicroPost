import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { Platform } from 'ionic-angular';
import { envirotment as ENV } from '../../environments/environments';


@Injectable()
export class PushnotificationProvider {

  constructor(private oneSignal: OneSignal,
    public platform: Platform) {

  }

  init_notifications() {

    if (this.platform.is('cordova')) {

      this.oneSignal.startInit('dbfe0f75-b1ff-44b0-9660-0ba5b72702c1', '425557169219');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);


      this.oneSignal.handleNotificationReceived().subscribe((result) => {
        // do something when notification is received
        console.log('Notificacion recibida');
       //ENV.handleNotificationReceived = JSON.stringify(result);
      });

      this.oneSignal.handleNotificationOpened().subscribe((result) => {
        // do something when a notification is opened
        console.log('Notificacion abierta');
        //ENV.handleNotificationOpened = JSON.stringify(result);
      });

      this.oneSignal.endInit();

    } else {
      console.log('OneSignal no funciona en Chrome');
    }
  }

  async obtener_idPushUnico(): Promise<string> {
    //var constante: string; // con este metdod se obtiene el id de usuario necesario para diferenciar cada dispositivo
    await this.oneSignal.getIds().then((respuesta) => {
      
      ENV.IDPUSH = respuesta.userId;
    });
    return ENV.IDPUSH;
  }  

  async getDataFromPush(): Promise<any>{
   return await this.oneSignal.handleNotificationOpened(); 
  }
  
}

