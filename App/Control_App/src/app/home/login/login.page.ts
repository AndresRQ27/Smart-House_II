import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectionService } from '../../connection.service';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  inputUser: string = "";
  inputPassword: string = "";
  dataObject: any[];
  authentication: boolean = false;

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private connectionServices: ConnectionService,
    public http: HttpClient)
   { }

   onConfirm(){


    // const params = new HttpParams().set('user', this.inputUser).set('password', this.inputPassword);

    // this.http.get('http://' + this.connectionServices.getIP() + ':' + 
    // this.connectionServices.getPort() + '/', {params}).subscribe((data:any) => {
    //   console.log(data);
    //   this.dataObject = data;
    //   this.authentication = this.dataObject['auth'] ? true : false;

    //   if (this.authentication === false){
    //     this.alertCtrl.create({
    //       header: 'Error',
    //       message: 'Invalid credentials',
    //       buttons: [{text: 'Ok', role: 'cancel'}]
    //     }).then(alertEl => {
    //       alertEl.present();
    //     });
    //     return;
    //   }
    //   this.router.navigate(['/control']);
    // });
    this.router.navigate(['/control']);
  }


}
