import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Devices {

data: any;

constructor(public http: Http) {
this.data = null;
}

getDevices(){

if (this.data) {
  return Promise.resolve(this.data);
}

return new Promise(resolve => {

  this.http.get('http://localhost:8080/api/devices')
    .map(res => res.json())
    .subscribe(data => {
      this.data = data;
      resolve(this.data);
    });
});

}

createDevice(device){

let headers = new Headers();
headers.append('Content-Type', 'application/json');

this.http.post('http://localhost:8080/api/devices', JSON.stringify(devices), {headers: headers})
  .subscribe(res => {
    console.log(res.json());
  });

}
