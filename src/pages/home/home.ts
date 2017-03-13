import { VideoPage } from './../video/video';
import { SearchPage } from './../search/search';
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
public commentOpen = false;
  public opened = false;
  public closed = true;
private uniqtags = new Set();


  categories: any;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, private loginservice: Loginservice, private mediaService: Mediaservice) {
      if (localStorage.getItem("user") !== null){
              this.loginservice.setUser(JSON.parse(localStorage.getItem("user")));
              this.loginservice.logged = true;
            } else if (this.loginservice.getUser().password !== undefined){
              this.loginservice.login();
            }


      this.categories= ['vahvistin','cat2','pöytä','cat4','cat5','cat6'];

        

      this.getStuffWithTag2("BS");

/*
      for (let i=0; i<6; i++) {
            let random = Math.floor(Math.random() * this.mediaInfo.length);
            
                    this.categories[i] = random;
                    
        }
*/

  }

  navVideo(id: number) {
    console.log(id);
    this.navCtrl.push(VideoPage, {firstPassed: id},  this.navOptions);
  }


/*
getStuff() {
        this.mediaService.getMediaByTag(encodeURI("BS")).subscribe(
          res => {
            this.media = res;
            this.media.reverse();
            
           // this.media = this.sortByDate(this.media2);

            for (let i = 0; i<this.media.length; i++) {
              let info:Info = new Info;
              this.mediaInfo.unshift(info);
    
                
                this.populateInfo(i,this.media[i].file_id);

            }
          }
      );
}*/

getStuffWithTag2(tag:string) {
        this.media = [];
        this.mediaInfo = [];

        this.mediaService.getMediaByTag(encodeURI(tag)).subscribe(
          res => {
            for (let i=res.length-1; i>=0; i--) {
                this.mediaService.getTagsByMedia(res[i].file_id).subscribe(
                      tagres => {
                          if (tagres.length > 0) {
                            if (tagres[0].tag == "BS") {
                              this.media.push(res[i]);
                              this.mediaInfo.push(this.mediaService.populateInfo(res[i].file_id, tagres));
                              
                            }
                          }
                      });
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
  navSearch() {
   this.navCtrl.push(SearchPage, null, this.navOptions);
 }
  navLogin() {
   this.navCtrl.push(LoginPage, null, this.navOptions);
 }

  private addFav(fileid:number, index:number) {
      //let favjson = JSON.stringify({"file_id":fileid});

      console.log(fileid+"  index: "+index)

      this.mediaService.setFavourite(fileid).subscribe(
          data => {
            this.mediaService.getFavouritesByMediaId(fileid).subscribe(
              respo => {
                this.mediaInfo[index].likes = respo
              });
          },
          error => {
            console.log("already favorited");
          }

      );


  }
 openCat() {
    this.closed = false;
    this.opened = true;
  }

  chooseCat(category) {
    this.cate= category
    this.opened = false;
    this.closed = true;

    this.getStuffWithTag2(category);
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
        public tags:any = [];
        public comments: any = [];
}


