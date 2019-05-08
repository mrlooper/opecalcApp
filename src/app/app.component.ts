import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MainService } from './services/main-service';
import { FcmService } from './services/fcm.service';
import { DialogService } from './services/dialog-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  params: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public mS: MainService,
    private fcm: FcmService,
    public dialogCtrl: DialogService
  ) {

    this.params = {
      background: 'assets/images/background/products.png',
      image: 'assets/images/logo/login-bp.png',
      title: 'OPECalc - Punto de encuentro OPE'
    };

    this.initializeApp();
  }

  private notificationSetup() {
    this.fcm.getToken();
    this.fcm.onNotifications().subscribe(
      (msg) => {
        if (this.platform.is('ios')) {
          this.dialogCtrl.presentToast(msg.aps.alert);
        } else {
          this.dialogCtrl.presentToast(msg.body);
        }
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.notificationSetup();
    });
  }
}
