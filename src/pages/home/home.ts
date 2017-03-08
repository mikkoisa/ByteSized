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

export class HomePage implements OnInit{

  private media: any = [];
   private mediaInfo: any = [];
paska:any = null;
  navOptions = {
    animate: false
  }


  public cate = "Popular";

  public opened = false;
  public closed = true;

 private fileid: any;
 private singlemedia: any;
  private user: any = null;
  private userid;
  private likes:any = [];

  categories: any;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, private loginservice: Loginservice, private mediaService: Mediaservice) {
  if (localStorage.getItem("user") !== null){
          this.loginservice.setUser(JSON.parse(localStorage.getItem("user")));
          this.loginservice.logged = true;
        } else if (this.loginservice.getUser().password !== undefined){
          this.loginservice.login();
        }


  this.categories= ['cat1','cat2','cat3','cat4','cat5','cat6'];

    

   this.mediaService.getNew().subscribe(
      res => {
        this.media = res;

        for (let i = 0; i<this.media.length; i++) {
          let info:Info = new Info;
          this.mediaInfo.unshift(info);
 
            
            this.populateInfo(i,this.media[i].file_id);

        }
      }
    );
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

populateInfo(ind:number, fileid:number) {
      
      this.mediaService.getMediaById(fileid)
      .subscribe((res) =>  {
        this.singlemedia = res;
        this.mediaInfo[ind].fileid = fileid;
        this.mediaInfo[ind].userid = res.user_id;

        this.mediaService.getUserByUserId(res.user_id)
        .subscribe(resp => {
          this.mediaInfo[ind].user = resp
          //this.paska = info.user.username;
        });

        this.mediaService.getFavouritesByMediaId(res.file_id)
        .subscribe(respo => {
          this.mediaInfo[ind].likes = respo
        });
      });
      //return info;
  }

  private addFav(fileid:number) {
      let favjson = JSON.stringify({"file_id":fileid});

      this.mediaService.setFavourite(favjson).subscribe(res => console.log(res));
  }
 openCat() {
    this.closed = false;
    this.opened = true;
  }

  chooseCat(category) {
    this.cate= category
    this.opened = false;
    this.closed = true;
  }
 private getUser(file_id:number) {
   let user;
   this.mediaService.getMediaById(file_id)
      .subscribe((res) =>  {
         this.media = res;


         this.mediaService.getUserByUserId(res.user_id)
         .subscribe(resp => {
           user = resp;
           return user;
          });

         
      });
      
 }

 populate() {
   
   for (let i of this.media) {
     console.log(i);
      // let info = new Info();

      // this.mediaService.getMediaById(this.media[i].file_id)
      // .subscribe((res) =>  {
      //   this.media = res;


      //   info.fileid = this.media[i].file_id;
      //   info.userid = res.user_id;

        

      //   this.mediaService.getUserByUserId(res.user_id)
      //   .subscribe(resp => {info.user = resp});

      //   this.mediaService.getLikesByMediaId(res.file_id)
      //   .subscribe(respo => info.likes = respo);

      // });

      // this.mediaInfo[this.media[i]] = info;
  
   }
      
  }

 ngOnInit() {
    // if (!this.loginService.logged)
    //   this.router.navigate(['login']);



      
    
   
  }


}
class Info {
     public fileid: any = 0;
      public user: any = {username: null};
      public userid:any = null;
      public likes:any = [];
}


