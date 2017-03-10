import { Loginservice } from './../../providers/loginservice';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: Loginservice) {

      if (localStorage.getItem("user") !== null){
        this.loginService.setUser(JSON.parse(localStorage.getItem("user")));
        this.loginService.logged = true;
      } else if (this.loginService.getUser().password !== undefined){
        this.loginService.login();
      }
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }


  private getUserInfo() {
    
  }
  private getMedia() {

  }



}
