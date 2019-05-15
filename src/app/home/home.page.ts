import { Component } from '@angular/core';
import { MainService } from '../services/main-service';
import { DialogService } from '../services/dialog-service';
import { AdmobFreeService } from '../services/admobfree.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public mS: MainService,
    public dialogCtrl: DialogService,
    private admobFreeService: AdmobFreeService) {
  }

  onClickCalculadora() {
    this.navCtrl.navigateForward('listado-calculadoras');
  }

  onClickMisPlantillas() {
    this.navCtrl.navigateForward('listado-plantillas-usuario');
  }

  onClick() {
    console.log('Mostrando Banner');
    this.admobFreeService.BannerAd();
  }

  showInterstitial(){
    this.admobFreeService.InterstitialAd();
  }
}
