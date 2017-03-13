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

  private segmentMode = "Login";

  navOptions = {
    animate: false
  }
  loginUser = {
    username:'',
    password:'',
  };

  registerUser = {
    username:'',
    email:'',
    password:'',
    full_name:'',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: Loginservice) {

    if (localStorage.getItem("user") !== null){
      this.loginService.setUser(JSON.parse(localStorage.getItem("user")));
      this.loginService.logged = true;
    } else if (this.loginService.getUser().password !== undefined){
      this.loginService.login();
    }
  }

  navHome() {
    this.navCtrl.setRoot(HomePage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  register = () => {
    console.log(this.registerUser);
    this.loginService.setUser(this.registerUser);
    this.loginService.register();
  }

  login() {
      console.log(this.loginUser);
      this.loginService.setUser(this.loginUser);
      this.loginService.login();
      
    }
}
