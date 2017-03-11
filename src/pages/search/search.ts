import { VideoPage } from './../video/video';
import { Loginservice } from './../../providers/loginservice';
import { Mediaservice } from './../../providers/mediaservice';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice, public mediaservice:Mediaservice) {
    this.nostuff = 0;
     if (localStorage.getItem("user") !== null){
        this.loginservice.setUser(JSON.parse(localStorage.getItem("user")));
        this.loginservice.logged = true;
      } else if (this.loginservice.getUser().password !== undefined){
        this.loginservice.login();
      }
  }

    navOptions = {
    animate: false
  }
  private cate = "";
  private nostuff:number;
  //private media = [];
  //private mediaInfo = [];
private searchQuery:string = "";
private tempsearchQuery:string = "";
private tab:string = "videos";
private tags = [];
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
search(asd) {
  if (this.searchQuery.length > 1) {
        this.mediaservice.media = [];
        this.mediaservice.mediaInfo = [];

          if (this.tab == "videos") {

            console.log("videos: "+this.searchQuery);
            this.searchVideos();

          

          } else if (this.tab == "users") {
            console.log(this.searchQuery);
            this.searchUsers();
          }

    
  }
}


  navVideo(id: number) {
    console.log(id);
    this.navCtrl.push(VideoPage, {firstPassed: id},  this.navOptions);
  }

searchVideos() {
  this.mediaservice.searchByTitle(this.searchQuery).subscribe(
              res => {
                if (res.length <= 0) {
                  this.nostuff = 2;
                  this.tempsearchQuery = this.searchQuery;
                } else {
                  
                console.log(res);
                for(let i=0; i<res.length; i++) {
                    this.mediaservice.getTagsByMedia(res[i].file_id).subscribe(
                        tagres => {
                          if (tagres.length > 0) {
                            //console.log(tagres);
                            if (tagres[0].tag == "BS") {
                              this.tempsearchQuery = this.searchQuery;
                              this.nostuff = 1;
                              this.mediaservice.media.push(res[i]);
                              this.mediaservice.mediaInfo.push(this.mediaservice.populateInfo(res[i].file_id, tagres));
                            }
                          }
                    });
                }

                }



              

              }
   );
}



searchUsers() {
  this.mediaservice.searchUsers().subscribe(
    res => {
        for (let i=0; i<res.length; i++) {
          if (res[i].username == (this.searchQuery)) {
            console.log(res[i]);
          }
        }
    }
  );
}



  chooseCat(category) {
    this.cate= category
    this.tab = "videos";

    this.mediaservice.getStuffWithTag(category);
  }




tabchange(t) {
  console.log("tabchange "+t);


  if (t == "videos") {

    console.log(t);
  } else if (t == "users") {
    console.log(t);

  } 
}


getItems(asd) {
  console.log(asd);
}

}
