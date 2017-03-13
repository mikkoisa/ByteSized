import { ProfilePage } from './../pages/profile/profile';
import { VideoPage } from './../pages/video/video';
import { SearchPage } from './../pages/search/search';
import { Loginservice } from './../providers/loginservice';
import { Mediaservice } from './../providers/mediaservice';
import { LoginPage } from './../pages/login/login';
import { UploadPage } from './../pages/upload/upload';
import { ThumbnailPipe } from './pipes/thumbnail.pipe';
//import { UploadPage } from './../pages/home/home';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UploadPage,
    LoginPage,
    ThumbnailPipe,
    SearchPage,
    VideoPage,
    ProfilePage
    
  ],
  imports: [
    IonicModule.forRoot(MyApp),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UploadPage,
    LoginPage,
    SearchPage,
    VideoPage,
    ProfilePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
  {provide: Mediaservice, useClass: Mediaservice},
  {provide: Loginservice, useClass: Loginservice}
  
  ]
})
export class AppModule {}
