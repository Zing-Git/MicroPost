import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


@Injectable()
export class PushnotificationProvider {

  constructor(private oneSignal: OneSignal,
    private alertCtrl: AlertController,
    public platform: Platform) {

  }

  init_notifications() {

    if (this.platform.is('cordova')) {

      this.oneSignal.startInit('dbfe0f75-b1ff-44b0-9660-0ba5b72702c1', '425557169219');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);


      this.oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when notification is received
        console.log('Notificacion recibida');
      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
        console.log('Notificacion abierta');
      });

      this.oneSignal.endInit();

    } else {
      console.log('OneSignal no funciona en Chrome');
    }


  }

  obtener_idPushUnico(): string {

    var res: string = ' ';
    // con este metdod se obtiene el id de usuario necesario para diferenciar cada dispositivo
    this.oneSignal.getIds().then((respuesta) => {
      res= respuesta.userId;
      /*let alert = this.alertCtrl.create({
          title: 'the onesignal ids object',
          message: respuesta.userId,
          buttons: [{
            text: 'Ok',
            role: 'ok'
          }]
        });
        alert.present();*/
    });
    return res;
  }

}

