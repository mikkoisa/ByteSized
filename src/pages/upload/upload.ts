import { Mediaservice } from './../../providers/mediaservice';
import { Loginservice } from './../../providers/loginservice';
import { HomePage } from './../home/home';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera} from 'ionic-native';
import { Transfer } from 'ionic-native';
import {NgZone} from '@angular/core';

/*
  Generated class for the Upload page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
  providers: [Loginservice]
})
export class UploadPage {

  constructor(public mediaservice: Mediaservice,public loginservice: Loginservice,public navCtrl: NavController, public navParams: NavParams, private ngZone: NgZone) {
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

     navBack() {
    this.navCtrl.pop();
  }

  private tags:any = [];
  cameraData: string;
  videoUrl: any;
  videoSelected: boolean;

  title:string;
  desc:string;

  upattu:boolean = false;

  uploading: boolean = true;
    current: number = 1;
    total: number;
    progress: number;

    tagerror:boolean;


  selectVideo() {
    var options = {

      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: Camera.DestinationType.DATA_URL,

        mediaType: Camera.MediaType.ALLMEDIA
      };
      Camera.getPicture(options).then((data) => {
        this.videoUrl = data;
        this.videoSelected = true;


      }, (err) => {
        //error
      });

  }

  navLogin() {
    this.navCtrl.push(LoginPage, null, this.navOptions);
  }

  navHome() {
    this.navCtrl.push(HomePage, null, this.navOptions)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }


  done = () : void => {
        this.navCtrl.setRoot(HomePage);    
    }
    
    // success = (result: any) : void => { 
    //     if(this.current < this.total) {             
    //         this.current++;
    //         this.progress = 0;                    
    //         this.upload(this.images[this.current - 1]);
    //     } else {   
    //         this.uploading = false;
    //     }
    // }
            
    // failed = (err: any) : void => {
    //     let code = err.code;
    //     alert("Failed to upload image. Code: " + code);
    // }
    
    onProgress =  (progressEvent: ProgressEvent) : void => {
        this.ngZone.run(() => {
            if (progressEvent.lengthComputable) {
                let progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                console.log(progress);
                this.progress = progress

            }
        });
    }

    addTag(value:any) {
        console.log(value);
        if (value !== '') {
          if (this.tags.length < 10) {
            this.tagerror = false;
            let flag = false;
            for (let i=0; i<this.tags.length; i++) {
                if (this.tags[i] === value) {
                  flag = true;
                  break;
                }
            }
            if (flag == false ) {
              this.tags.push(value);
            }
          } else {
            this.tagerror = true;
          }
        }
    }
    deleteTag(value:any) {
      for (let i=this.tags.length-1; i>=0; i--) {
          if (this.tags[i] === value) {
              this.tags.splice(i, 1);
          }
      }
    }
    
    upload = (data:any) : void => { 
        let ft = new Transfer();

        this.title = data.title;
        this.desc = data.desc;
        let options = {
            httpMethod: "POST",
            mimeType: 'video/mp4',
            fileName: 'file.mp4',
            headers: {
              
              //token: this.loginservice.getUser().token
            },
            params: {
              
              title: this.title,
              description: this.desc

            }
        }; 
        ft.onProgress(this.onProgress);

        ft.upload(this.videoUrl,'http://media.mw.metropolia.fi/wbma/media?token='+this.loginservice.getUser().token, options, false)
        .then((result: any) => {
            //this.success(result);

            let token:string = JSON.parse(localStorage.getItem("user")).token;

            const file_id:number=JSON.parse(result.response).file_id;
            this.mediaservice.setTag(file_id,"BS",token).subscribe(
              data => console.log(data)
            );
            for (let i=0; i<this.tags.length; i++) {
              this.mediaservice.setTag(file_id,this.tags[i],token).subscribe(
                data => console.log(data)
              );
            }
            this.upattu = true;
            //this.navHome();
        }).catch((error: any) => {
            //this.failed(error);
            console.log(error);
        }); 
    }

}
