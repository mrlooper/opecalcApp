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
import { StoreModule } from '@ngrx/store';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { AdmobFreeService } from './services/admobfree.service';

/**
 * IDs admob test
Banner [ca-app-pub-3940256099942544/6300978111]
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
    AppRoutingModule
  ],
  providers: [
    InAppBrowser,
    StatusBar,
    SplashScreen,
    AdMobFree,
    AdmobFreeService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UniqueDeviceID,
    DialogService,
    ValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
