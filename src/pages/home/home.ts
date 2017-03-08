import { Mediaservice } from './../../providers/mediaservice';
import { Loginservice } from './../../providers/loginservice';
import { LoginPage } from './../login/login';
import { UploadPage } from './../upload/upload';
import { Component, OnInit } from '@angular/core';

//import { bootstrap, provide} from 'angular2/angular2';

import { NavController, MenuController } from 'ionic-angular';

//import {RouteConfig,  ROUTER_DIRECTIVES, ROUTER_PROVIDERS,
     //   LocationStrategy, HashLocationStrategy} from 'angular2/router';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Loginservice, Mediaservice],
})

export class HomePage implements OnInit {

  private media: any = [];
 
  navOptions = {
    animate: false
  }

  categories: any;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, private loginservice: Loginservice, private mediaService: Mediaservice) {
  if (localStorage.getItem("user") !== null){
          this.loginservice.setUser(JSON.parse(localStorage.getItem("user")));
          this.loginservice.logged = true;
        } else if (this.loginservice.getUser().password !== undefined){
          this.loginservice.login();
        }


  this.categories= ['cat1','cat2','cat3','cat4','cat5','cat6'];
  }
  
   openMenu() {
   this.menuCtrl.open();
  }

   closeMenu() {
   this.menuCtrl.close();
 }

 toggleMenu() {
   this.menuCtrl.toggle();
 }

 navUpload() {
   this.navCtrl.push(UploadPage, null, this.navOptions);
 }
 
  navLogin() {
   this.navCtrl.push(LoginPage, null, this.navOptions);
 }

 ngOnInit() {
    // if (!this.loginService.logged)
    //   this.router.navigate(['login']);

    this.mediaService.getNew().subscribe(
      res => {
        this.media = res;
      }
    );
  }
}


