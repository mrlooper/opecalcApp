import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MainService } from './services/main-service';
import { Store, select } from '@ngrx/store';
import { IAppState } from './store/state/app.state';
import { selectEstado } from './store/selectors/estado.selectors';

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
  estado$ = this._store.select(state => state.estado );

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public mS: MainService,
    private _store: Store<IAppState>
  ) {

    this.params = {
      background: 'assets/images/background/products.png',
      image: 'assets/images/logo/login-bp.png',
      title: 'OPECalc - Punto de encuentro OPE'
    };

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
