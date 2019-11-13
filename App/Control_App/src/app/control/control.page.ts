import { Component, OnInit, RootRenderer } from '@angular/core';
import { ConnectionService } from '../connection.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-control',
  templateUrl: './control.page.html',
  styleUrls: ['./control.page.scss'],
})
export class ControlPage{

  photoImg : string = 'assets/picture.png';
  dataObject : any[];
  iconAlarm = 'notifications';
  iconLock = 'unlock';
  id : any;

  constructor( private connectionServices: ConnectionService,
    private router: Router,
    public http: HttpClient) {

      

  //   this.id = setInterval(() => {

  //     const params = new HttpParams().set('update', '');
  //     this.http.get('http://' + this.connectionServices.getIP() + ':' + 
  //     this.connectionServices.getPort() + '/', {params}).subscribe((data:any) => {
  //       //console.log(data);
  //       this.dataObject = data;

  //       this.stateRoom1 = this.dataObject['bed1'] ? this.lightOn : this.lightOff;
  //       this.stateRoom2 = this.dataObject['bed2'] ? this.lightOn : this.lightOff;
  //       this.stateKitchen = this.dataObject['kitchen'] ? this.lightOn : this.lightOff;
  //       this.stateLivingRoom = this.dataObject['living'] ? this.lightOn : this.lightOff;
  //       this.stateDiner = this.dataObject['dining'] ? this.lightOn : this.lightOff;

  //       this.stateDoor1 = this.dataObject['door1'] ? this.openedDoor : this.closedDoor;
  //       this.stateDoor2 = this.dataObject['door2'] ? this.openedDoor : this.closedDoor;
  //       this.stateDoor3 = this.dataObject['door3'] ? this.openedDoor : this.closedDoor;
  //       this.stateDoor4 = this.dataObject['door4'] ? this.openedDoor : this.closedDoor;
  //   });

  // }, 100);//every second
    //update all status
  }
  onPhoto(){
    console.log("Photo");
    this.photoImg = 'http://' + this.connectionServices.getIP() + ':' + 
    this.connectionServices.getPort() + '/image?' + new Date().getTime();
  }
  onVideo(){
    console.log("Video");
    window.location.href = 'http://' + this.connectionServices.getIP() + ':5000' + '/';
  }
  onAlarm(){
    console.log("Alarm");
    const params = new HttpParams().set('alarm', '');
    this.http.get('http://' + this.connectionServices.getIP() + ':' + 
    this.connectionServices.getPort() + '/', {params}).subscribe((data:any) => {
      console.log(data);
      this.dataObject = data;
      this.iconAlarm = this.dataObject['state'] ? 'notifications-off' : 'notifications';
    });
  }
  onLock(){
    console.log("Lock");
    const params = new HttpParams().set('lock', '');
    this.http.get('http://' + this.connectionServices.getIP() + ':' + 
    this.connectionServices.getPort() + '/', {params}).subscribe((data:any) => {
      console.log(data);
      this.dataObject = data;
      this.iconLock = this.dataObject['state'] ? 'lock' : 'unlock';
    });
  }
  onUpdateColor(value){
    console.log("Lights turned to " + value);
    const params = new HttpParams().set('light', value);
    this.http.get('http://' + this.connectionServices.getIP() + ':' + 
    this.connectionServices.getPort() + '/', {params}).subscribe((data:any) => {
      console.log(data);
    });
  }
}
