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



  // upload = (fData:any) => {
  //   return this.http.post(this.url + '/media?token='+this.loginService.getUser().token, fData).map(
  //     res => res.json()
  //   );
  // }


}
