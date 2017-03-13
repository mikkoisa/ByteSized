import { Loginservice } from './loginservice';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Mediaservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Mediaservice {

  constructor(public http: Http, private loginService:Loginservice) {
    console.log('Hello Mediaservice Provider');
  }

   private url: string = 'http://media.mw.metropolia.fi/wbma';
   public mediaInfo:any = [];
   public media:any = [];

  getMediaById = (fileid: number) => {
      return this.http.get(this.url + '/media/' + fileid + '?token=' + this.loginService.getUser().token)
      .map(res => res.json());
  }

  getUserByUserId = (userid:number) => {
      return this.http.get(this.url + '/users/' + userid + '?token=' + this.loginService.getUser().token)
      .map(res => res.json());
  }
  getFavouritesByMediaId = (mediaid:number) => {
    return this.http.get(this.url + '/favourites/file/' + mediaid)
    .map(res => res.json());
  }

  getMedia = () => {
    return this.http.get(this.url + '/media')
      .map(res => res.json());
  }

  getNew = () => {
    let start:number = 0;
    let limit:number = 10;
    return this.http.get(this.url + '/media?start='+start+'&limit='+limit)
      .map(
        res =>
          res.json()
      );
  }

  setTag = (file_id:number, tag:string,token:any) => {
    
    return this.http.post(this.url + '/tags?token='+token,{"file_id":file_id, "tag":tag}).map(
      res => res.json()
    );
  }

  setFavourite = (file_id: number) => {

    return this.http.post(this.url + '/favourites/?token='+this.loginService.getUser().token, {"file_id":file_id}).map(
      res => res.json()
    );
  }

  getMediaByTag = (tag:string) => {
    return this.http.get(this.url + '/tags/'+tag+'?token='+this.loginService.getUser().token).map(
      res => res.json()
    );
  }

  getTagsByMedia = (file_id:any) => {
    return this.http.get(this.url + '/tags/file/'+file_id+'?token='+this.loginService.getUser().token).map(
      res => res.json()
    );

  }

  getAllTags = () => {
    return this.http.get(this.url + '/tags?token='+this.loginService.getUser().token).map(
      res => res.json()
    );
  }

  searchByTitle = (keyword:string) => {
    return this.http.post(this.url + '/media/search?token='+this.loginService.getUser().token, {"title":keyword}).map(
      res => res.json()
    );
  }

  searchByDesc = (keyword:string) => {
    return this.http.post(this.url + '/media/search?token='+this.loginService.getUser().token, {"description":keyword}).map(
      res => res.json()
    );
  }


  // upload = (fData:any) => {
  //   return this.http.post(this.url + '/media?token='+this.loginService.getUser().token, fData).map(
  //     res => res.json()
  //   );
  // }
setComment = (file_id: number, comment: string) => {
    return this.http.post(this.url + '/comments/?token='+this.loginService.getUser().token,{"file_id":file_id, "comment":comment}).map(
      res => res.json()
    );
  }
  getComments = (mediaid:number) => {
    return this.http.get(this.url + '/comments/file/' + mediaid)
      .map(res => res.json());
  }

populateInfo(fileid:number, tags:any) {
      
      let mediaInfo:Info = new Info;

      this.getMediaById(fileid)
      .subscribe((res) =>  {
        
        mediaInfo.fileid = fileid;
        mediaInfo.userid = res.user_id;

        this.getUserByUserId(res.user_id)
        .subscribe(resp => {
          mediaInfo.user = resp
          //this.paska = info.user.username;


          this.getComments(res.file_id)
          .subscribe(respon => {
            mediaInfo.comments = respon


                    this.getFavouritesByMediaId(res.file_id)
                .subscribe(respo => {
                  mediaInfo.likes = respo
                });
          });
        });

                



        mediaInfo.tags = tags;


        // this.getTagsByMedia(res.file_id)
        // .subscribe(res => {

        //   //console.log(res);
        //   mediaInfo[ind].tags = res;
        

        // });
      });
      return mediaInfo;
  }

populateInfo2(media:any, tags:any):boolean {
      
      let mediaInfo:Info = new Info;

        
        mediaInfo.fileid = media.file_id;
        mediaInfo.userid = media.user_id;

        this.getUserByUserId(media.user_id)
        .subscribe(resp => {
          mediaInfo.user = resp

          mediaInfo.tags = tags;
          //this.paska = info.user.username;

                          this.getComments(media.file_id)
          .subscribe(respon => {
            mediaInfo.comments = respon


                          this.getFavouritesByMediaId(media.file_id)
              .subscribe(respo => {
                mediaInfo.likes = respo
                
                this.media.push(media);
                this.mediaInfo.push(mediaInfo);
                  console.log("VVAVA");
                return true;
              });
          });
        });




        return false;
        

  
      //return mediaInfo;
  }

searchTags() {
  return this.http.get(this.url + '/tags?token='+this.loginService.getUser().token).map(
      res => res.json()
    );
}

  searchUsers() {
    return this.http.get(this.url + '/users?token='+this.loginService.getUser().token).map(
      res => res.json()
    );
  }

    private addFav(fileid:number, index:number) {
      //let favjson = JSON.stringify({"file_id":fileid});

      console.log(fileid+"  index: "+index)

      this.setFavourite(fileid).subscribe(
          data => {
            this.getFavouritesByMediaId(fileid).subscribe(
              respo => {
                this.mediaInfo[index].likes = respo
              });
          },
          error => {
            console.log("already favorited");
          }

      );
  }
getUsersUploads = (user_id: number) => {
    return this.http.get(this.url + '/media/user/' + user_id + '?token='+this.loginService.getUser().token).map(
      res => res.json()
    );
  }
getFavourites = () => {
  return this.http.get(this.url + '/favourites?token='+this.loginService.getUser().token).map(
      res => res.json()
    );
}

  getStuffWithTag(tag:string) {
          this.media = [];
          this.mediaInfo = [];

          this.getMediaByTag(encodeURI(tag)).subscribe(
            res => {
              for (let i = 0; i<res.length; i++) {
                  this.getTagsByMedia(res[i].file_id).subscribe(
                        tagres => {
                            if (tagres.length > 0) {
                              if (tagres[0].tag == "BS") {
                                this.media.push(res[i]);
                                this.mediaInfo.push(this.populateInfo(res[i].file_id, tagres));
                              }
                            }
                        });
              }
            }
          );
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