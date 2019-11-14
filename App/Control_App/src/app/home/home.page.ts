import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ConnectionService } from '../connection.service';
import { Plugins, 
         PushNotification, 
         PushNotificationToken,
         PushNotificationActionPerformed } from '@capacitor/core';

const { PushNotifications } = Plugins;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  inputIP: string = "";
  inputPort: string = "";


  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private connectionServices: ConnectionService)
   {}

  onConfirm(){
    console.log('confirm');
    if (this.inputIP.trim().length <= 0 || this.inputPort.trim().length <= 0) {
      this.alertCtrl.create({
        header: 'Error',
        message: 'Please enter a valid IP and port',
        buttons: [{text: 'Ok', role: 'cancel'}]
      }).then(alertEl => {
        alertEl.present();
      });
      console.log("Invalid port or ip");
      return;
    }

    this.connectionServices.setPort(this.inputPort);
    this.connectionServices.setIP(this.inputIP);


    this.router.navigate(['/login']);
    console.log('IP:', this.connectionServices.getIP(), 'Port:', this.connectionServices.getPort());
  }

  ngOnInit(){
    console.log('Initializing HomePage');

    //Register with Google to receive FCM
    PushNotifications.register();

    //On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token : PushNotificationToken) => {
        alert('Push registration success, token: ' + token.value);
        console.log(token.value)
      }
    );
    
    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );
    
    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }

}
