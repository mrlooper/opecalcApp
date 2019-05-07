import { Component } from '@angular/core';
import { MainService } from '../services/main-service';
import { DialogService } from '../services/dialog-service';
import { AdmobFreeService } from '../services/admobfree.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public mS: MainService,
    public dialogCtrl: DialogService,
    private admobFreeService: AdmobFreeService) {
    /*this.plt.ready().then(() => {
      admob.banner.show({ id: 'ca-app-pub-3940256099942544/6300978111' });
    });*/
  }

  onClick() {
    console.log('Mostrando Banner');
    this.admobFreeService.BannerAd();
  }

  showInterstitial(){
    this.admobFreeService.InterstitialAd();
  }
}
