import { CommonModule } from '@angular/common';
import { HomePage } from './../home/home';
import { ProfilePage } from './../profile/profile';
import { LoginPage } from './../login/login';
import { Mediaservice } from './../../providers/mediaservice';
import { Loginservice } from './../../providers/loginservice';
import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

/*
  Generated class for the Video page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
  providers: [Mediaservice, Loginservice, HomePage, CommonModule],
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaService: Mediaservice, private loginservice: Loginservice, public http: Http) {
    // if (localStorage.getItem("user") !== null) {
    //   this.loginservice.setUser(JSON.parse(localStorage.getItem("user")));
    //   this.loginservice.logged = true;
    // } else if (this.loginservice.getUser().password !== undefined) {
    //   this.loginservice.login();
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

        this.mediaService.getComments(this.param)
          .subscribe((respo) => {
            this.comments = respo;
            console.log(this.comments);

            for (let i = 0; i < this.comments.length; i++) {
              this.mediaService.getUserByUserId(this.comments[i].user_id)
              .subscribe((responssi) => {
                this.comments[i]["username"] = responssi.username ;
              //  console.log(responssi);
             //   console.log(this.comments[i].user_id)
              });

              
              //console.log(this.comments[i]);
            }

          })
      });
                  console.log("vika"+this.comments);

  }

  comment(file_id: number, comment: any) {
    this.http.post('http://media.mw.metropolia.fi/wbma/comments/?token=' + this.loginservice.getUser().token, { "file_id": file_id, "comment": comment.comment });
    this.mediaService.setComment(file_id, comment.comment).subscribe(
      data => console.log(data));
    this.mediaService.getComments(this.param);
  }


  refreshComments() {
    this.mediaService.getComments(this.param);

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
    this.navCtrl.push(ProfilePage, null, this.navOptions);
  }

  navBack() {
    this.navCtrl.pop();
  }





}