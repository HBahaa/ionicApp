import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// import { ControlMessagesComponent } from './control-messages.component';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ServicePage } from '../pages/service/service';
import { ServicePage } from '../pages/service/service';
import { Devices } from '../providers/devices';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ServicePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ServicePage
  ],
  providers: [
    Devices,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
