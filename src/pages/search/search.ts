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
  private media = [];
  private mediaInfo = [];
private searchQuery:string = "";
private tempsearchQuery:string = "";
private tab:string = "videos";
private tags = [];

private loaded:boolean = false;
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
  this.loaded = false;
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
                            //this.mediaservice.media.push(res[i]);
                             // this.mediaservice.mediaInfo.push(this.mediaservice.populateInfo(res[i].file_id, tagres));
                              this.populateInfo2(res, tagres);
                            }
                          }
                    });
                }

                }



              

              }
   );
}


populateInfo2(media:any, tags:any) {
      
      let mediaInfo:Info = new Info;

        
        mediaInfo.fileid = media.file_id;
        mediaInfo.userid = media.user_id;

        this.mediaservice.getUserByUserId(media.user_id)
        .subscribe(resp => {
          mediaInfo.user = resp
         
          mediaInfo.tags = tags;


          console.log("EKAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
          //this.paska = info.user.username;

        });

         this.mediaservice.getComments(media.file_id)
          .subscribe(respon => {
            mediaInfo.comments = respon
             console.log("TOKA");

          });

           this.mediaservice.getFavouritesByMediaId(media.file_id)
              .subscribe(respo => {
                mediaInfo.likes = respo
                
                this.media.push(media);
                this.mediaInfo.push(mediaInfo);
  console.log("KOLMAS");

              });
}
    private addFav(fileid:number, index:number) {
      //let favjson = JSON.stringify({"file_id":fileid});

      console.log(fileid+"  index: "+index)

      this.mediaservice.setFavourite(fileid).subscribe(
          data => {
            this.mediaservice.getFavouritesByMediaId(fileid).subscribe(
              respo => {
                this.mediaInfo[index].likes = respo
              });
          },
          error => {
            console.log("already favorited");
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
class Info {
     public fileid: any = 0;
      public user: any = {username: null};
      public userid:any = null;
      public likes:any = [];
      public tags:any = [];
      public comments:any = [];
}