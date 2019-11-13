import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private port: string = "8080";
  private ip: string = "10.23.172.143";
  private user: string;
  private password: string;

  constructor() { }

  setPort(Port: string){
    this.port = Port;
  }
  getPort(){
    return this.port;
  }
  setIP(IP: string){
    this.ip = IP;
  }
  getIP(){
    return this.ip;
  }
  setUser(User: string){
    this.user = User;
  }
  getUser(){
    return this.user;
  }
  setPassword(Password: string){
    this.password = Password;
  }
  getPassword(){
    return this.password;
  }

}
