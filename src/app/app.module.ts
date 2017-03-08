import { Loginservice } from './../providers/loginservice';
import { Mediaservice } from './../providers/mediaservice';
import { LoginPage } from './../pages/login/login';
import { UploadPage } from './../pages/upload/upload';
import { ThumbnailPipe } from './pipes/thumbnail.pipe';
//import { UploadPage } from './../pages/home/home';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UploadPage,
    LoginPage,
    ThumbnailPipe,
    
  ],
  imports: [
    IonicModule.forRoot(MyApp),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UploadPage,
    LoginPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
  {provide: Mediaservice, useClass: Mediaservice},
  {provide: Loginservice, useClass: Loginservice}
  ]
})
export class AppModule {}
