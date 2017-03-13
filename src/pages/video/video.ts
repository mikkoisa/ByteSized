import { CommonModule } from '@angular/common';
import { HomePage } from './../home/home';
import { ProfilePage } from './../profile/profile';
import { LoginPage } from './../login/login';
import { Mediaservice } from './../../providers/mediaservice';
import { Loginservice } from './../../providers/loginservice';
import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the Video page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
  providers: [Mediaservice, Loginservice, CommonModule],
})
export class VideoPage {
  public user: any = [];
  public param: number;
  public media: any = [];
  public comments: any = [];
  public data = false;
  public username: any;

  navOptions = {
    animate: false
  }

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private mediaService: Mediaservice, private loginservice: Loginservice, public http: Http) {
    if (localStorage.getItem("user") !== null) {
      this.loginservice.setUser(JSON.parse(localStorage.getItem("user")));
      this.loginservice.logged = true;
     } else if (this.loginservice.getUser().password !== undefined) {
     this.loginservice.login();
    }
    this.loading();
    this.param = navParams.get("firstPassed")

    console.log(this.param);

    this.mediaService.getMediaById(this.param)
      .subscribe((res) => {
        this.media = res;
        console.log(this.media);
        this.data = true;

        this.mediaService.getUserByUserId(res.user_id)
          .subscribe(resp => {
            this.user = resp;
          });

         this.refreshComments();
      });
                  console.log("vika"+this.comments);

  }

  loading() {
    let loader = this.loadingCtrl.create({
      content: "",
      duration: 300
    });
    loader.present();
  }

  comment(file_id: number, comment: any) {
    //this.http.post('http://media.mw.metropolia.fi/wbma/comments/?token=' + this.loginservice.getUser().token, { "file_id": file_id, "comment": comment.comment });
    this.mediaService.setComment(file_id, comment.comment).subscribe(
      data => {
          console.log(data);
          this.refreshComments();
    }); 
    
    //this.mediaService.getComments(this.param);
  }


  refreshComments() {
    this.mediaService.getComments(this.param)
          .subscribe((respo) => {
            this.comments = respo;


            for (let i = 0; i < this.comments.length; i++) {
              this.mediaService.getUserByUserId(this.comments[i].user_id)
              .subscribe((responssi) => {
                this.comments[i]["username"] = responssi.username ;
                let temp = this.comments[i].time_added.split('T');
                temp[1] = temp[1].slice(0, -5);
                this.comments[i].time_added = temp[0]+" "+temp[1];
              //  console.log(responssi);
             //   console.log(this.comments[i].user_id)
              });

              
              //console.log(this.comments[i]);
            }
          });

  }



  // private getUser(fileid: number) {
  //   let user;
  //   this.mediaService.getMediaById(fileid)
  //     .subscribe((res) => {
  //       this.media = res;

  //       this.mediaService.getUserByUserId(res.user_id)
  //         .subscribe(resp => {
  //           user = resp;
  //           return user;
  //         });
  //     });

  //   console.log(this.media);
  //   console.log(this.param);
  //}

  openUser(user_id: number) {
      this.navCtrl.push(ProfilePage, {firstPassed: user_id}, this.navOptions);
      console.log("asdWasp");
    }


  navBack() {
    this.navCtrl.pop();
  }





}