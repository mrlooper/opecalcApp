import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { DialogService } from './services/dialog-service';
import { ValidationService } from './services/validation';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { AdmobFreeService } from './services/admobfree.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';
import { FcmService } from './services/fcm.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Market } from '@ionic-native/market/ngx';
import { Platform } from 'ionic-angular';


const config = {
  apiKey: 'AIzaSyC4a0iRyN9SW8wcwGVmU_575KxIL6Og6OA',
  authDomain: 'ope-calc.firebaseapp.com',
  databaseURL: 'https://ope-calc.firebaseio.com',
  projectId: 'ope-calc',
  storageBucket: 'ope-calc.appspot.com',
  messagingSenderId: '782774628404',
  appId: '1:782774628404:web:63b0119a5845e1cc'
};

/**
 * IDs admob test
Banner [app-pub-3940256099942544/63ca-00978111]
Interstitial [ca-app-pub-3940256099942544/1033173712]
Interstitial Video [ca-app-pub-3940256099942544/8691691433]
Rewarded Video [ca-app-pub-3940256099942544/5224354917]
Native Advanced [ca-app-pub-3940256099942544/2247696110]
Native Advanced Video [ca-app-pub-3940256099942544/1044960115]
 */

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule
  ],
  providers: [
    Platform,
    InAppBrowser,
    StatusBar,
    SplashScreen,
    AdMobFree,
    AdmobFreeService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UniqueDeviceID,
    DialogService,
    ValidationService,
    Firebase,
    FcmService,
    AppVersion,
    Market,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
