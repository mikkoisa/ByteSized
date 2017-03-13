import { LoginPage } from './../login/login';
import { SearchPage } from './../search/search';
import { UploadPage } from './../upload/upload';
import { HomePage } from './../home/home';
import { VideoPage } from './../video/video';
import { Mediaservice } from './../../providers/mediaservice';
import { Loginservice } from './../../providers/loginservice';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [Mediaservice, Loginservice, VideoPage]
})
export class ProfilePage {


  private omasivu:boolean = false;
  private userloaded:boolean=false;
  private param: any;
  public user: any;
  private uploadsopen:boolean = false;
  private favouritesopen:boolean = false;
  private uploadsShowingFromTo = [];
    private favouritesShowingFromTo = [];
  private maxVideosPerPage = 5;
  private montakosivuu:number;
  private montakosivuu2: number;
  public uploads: any = [];
  public favourites: any = [];
  private array = [];  private array2 = [];
  private currentPage = 0;
  private currentPage2 = 0;
  private favloaded:boolean=false;

  navOptions = {
    animate: false
  }

  constructor(public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams, private loginService: Loginservice, private mediaService: Mediaservice) {
    this.param = navParams.get("firstPassed");
    this.loading();

  if (localStorage.getItem("user") !== null){
          this.loginService.setUser(JSON.parse(localStorage.getItem("user")));
          this.loginService.logged = true;

          
        } else if (this.loginService.getUser().password !== undefined){
          this.loginService.login();
        }

      


    this.getUserInfo(this.param);


  }
   navBack() {
    this.navCtrl.pop();
  }
  navHome() {
   this.navCtrl.setRoot(HomePage);
 }
 navUpload() {
   this.navCtrl.setRoot(UploadPage);
 }
  navSearch() {
   this.navCtrl.setRoot(SearchPage);
 }
  navLogin() {
   this.navCtrl.setRoot(LoginPage);
 }
 loading() {
    let loader = this.loadingCtrl.create({
      content: "",
      duration: 300
    });
    loader.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  private getUserInfo(id: number) {
    this.mediaService.getUserByUserId(id)
      .subscribe((res) => {
        this.user = res;
        

            if (JSON.parse(localStorage.getItem("user")).user_id == this.user.user_id) {
              this.omasivu = true;
            }

            this.getUsersUploads(id);
            this.getUsersFavourites(id);

            this.userloaded = true;
      })
  }

  navVideo(id: number) {
    console.log(id);
    this.navCtrl.push(VideoPage, { firstPassed: id }, this.navOptions);
  }

  getUsersUploads(user_id: number) {
    this.mediaService.getUsersUploads(user_id)
    .subscribe((res) => {
      this.uploads = res;
      this.uploads.reverse();



      this.montakosivuu = Math.ceil(this.uploads.length/(this.maxVideosPerPage));
      this.uploadsShowingFromTo[0] = 1;
      //this.uploads.length < this.maxVideosPerPage ? this.uploadsShowingFromTo[1] = this.uploads.length : this.uploadsShowingFromTo[1] = this.maxVideosPerPage;
      if (this.montakosivuu == 1) {
        this.uploadsShowingFromTo[1] = this.uploads.length;
      } else {
        this.uploadsShowingFromTo[1] = this.maxVideosPerPage;
      }
      for (let i=0; i<this.montakosivuu; i++) {
        this.array.push(i);
      }
    })
  }

  pageLink(index:number ){
    if (index > this.currentPage) {
      this.uploadsShowingFromTo[0] += (index-this.currentPage)*this.maxVideosPerPage;
      let newMax = this.uploadsShowingFromTo[1] + (index-this.currentPage)*this.maxVideosPerPage;
      console.log(newMax);
 
      if (newMax > this.uploads.length) {
        this.uploadsShowingFromTo[1] = this.uploads.length;
      } else {
        this.uploadsShowingFromTo[1] = newMax;
      }

      
      this.currentPage = index;
    }
    if (index < this.currentPage) {
      this.uploadsShowingFromTo[0] -= (this.currentPage-index)*this.maxVideosPerPage;
      //let newMax = this.uploadsShowingFromTo[1] - (this.currentPage-index)*this.maxVideosPerPage;

        this.uploadsShowingFromTo[1] = this.uploadsShowingFromTo[0]+this.maxVideosPerPage-1;
      this.currentPage = index;
    }
  }

  getUsersFavourites(userid:number) {
console.log(userid);
    this.favloaded = false;
    this.mediaService.getFavourites().subscribe(
      res => {

          console.log(res);


        for (let i=0; i<res.length; i++) {

          console.log("l: "+res.length+"   "+i);
          if (res[i].user_id == this.param) {
            //this.favourites.push ( res[i]);
            //console.log(res[i]);
            
            this.mediaService.getMediaById(res[i].file_id).subscribe(
              resp => {
                this.favourites.push(resp);
                
                if (i==res.length-1) {
                  
                  this.favourites.reverse();
              this.favloaded=true;
              console.log("favourites length: "+this.favourites.length)


      this.montakosivuu2 = Math.ceil(this.favourites.length/(this.maxVideosPerPage));
      this.favouritesShowingFromTo[0] = 1;
      if (this.montakosivuu2 == 1) {
        this.favouritesShowingFromTo[1] = this.favourites.length;
      } else {
        this.favouritesShowingFromTo[1] = this.maxVideosPerPage;
      }
      for (let i=0; i<this.montakosivuu2; i++) {
        this.array2.push(i);
      }





                }
            });
          }
        }
      }
    )
  }

  pageLinkFavourites(index:number) {
    if (index > this.currentPage2) {
      this.favouritesShowingFromTo[0] += (index-this.currentPage2)*this.maxVideosPerPage;
      let newMax = this.favouritesShowingFromTo[1] + (index-this.currentPage2)*this.maxVideosPerPage;
 
      if (newMax > this.favourites.length) {
        this.favouritesShowingFromTo[1] = this.favourites.length;
      } else {
        this.favouritesShowingFromTo[1] = newMax;
      }
      this.currentPage2 = index;
    }

    if (index < this.currentPage2) {
      this.favouritesShowingFromTo[0] -= (this.currentPage2-index)*this.maxVideosPerPage;
      this.favouritesShowingFromTo[1] = this.favouritesShowingFromTo[0]+this.maxVideosPerPage-1;
      this.currentPage2 = index;
    }
  }
  openUser(user_id: number) {
      this.navCtrl.push(ProfilePage, {firstPassed: user_id}, this.navOptions);
      console.log("asdWasp");
    }


  private getMedia() {

  }



}
