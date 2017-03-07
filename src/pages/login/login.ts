import { Loginservice } from './../../providers/loginservice';
import { HomePage } from './../home/home';
import { UploadPage } from './../upload/upload';
import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Loginservice]
})

export class LoginPage {

  navOptions = {
    animate: false
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: Loginservice) {

    if (localStorage.getItem("user") !== null){
      this.loginService.setUser(JSON.parse(localStorage.getItem("user")));
      this.loginService.logged = true;
    } else if (this.loginService.getUser().password !== undefined){
      this.loginService.login();
    }
  }

  navUpload() {
   this.navCtrl.push(UploadPage, null, this.navOptions);
 }

  navHome() {
    this.navCtrl.push(HomePage, null, this.navOptions)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  register = (value: any) => {
    console.log(value);
    this.loginService.setUser(value);
    this.loginService.register();
  }

  login(value) {
      console.log(value);
      this.loginService.setUser(value);
      this.loginService.login();
    }
}
