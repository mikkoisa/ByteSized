import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Loginservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Loginservice {
 
  logged: Boolean = false;

  private url: string = 'http://media.mw.metropolia.fi/wbma';

  private user: any = {};

  constructor(public http: Http) {
    console.log('Hello Loginservice Provider');
  }
  setUser = (user) => {
    this.user = user;
    console.log(this.user);
  };

  getUser = () => {
    return this.user;
  }

  login = () => {
    // this.http.post(this.url, this.user,.....)
    return this.http.post(this.url+'/login', this.user)
      .subscribe(
        resp => {
          const dataFromServer = resp.json();
          // save userdata to Local Storage
          this.user = dataFromServer.user;
          this.user.token = dataFromServer.token;
          console.log(this.user);
          localStorage.setItem("user", JSON.stringify(this.user));
          this.logged = true;
          // navigate to 'front'
         // this.router.navigate(['front']);
        },
        error => {
          console.log(error);
        }
      );
  };

  register = () => {
    // this.http.post(this.url, this.user,.....)
    return this.http.post(this.url+'/users', this.user)
      .subscribe(
        resp => {
          this.user.user_id = resp.json().user_id;
          console.log(this.user);
          //this.router.navigate(['login']);
        },
        error => {
          console.log(error);
        }
      );
  };


}
