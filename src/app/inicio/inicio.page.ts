import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main-service';
import { DialogService } from '../services/dialog-service';
import { AdmobFreeService } from '../services/admobfree.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {


  constructor(public navCtrl: NavController,
    public mS: MainService,
    public dialogCtrl: DialogService,
    private admobFreeService: AdmobFreeService) {


  }

  onClickCalculadora() {
    this.navCtrl.navigateForward('listado-calculadoras');
  }

  onClickMensajes() {
    this.navCtrl.navigateForward('listado-mensajes');
  }

  onClickMisPlantillas() {
    this.navCtrl.navigateForward('listado-plantillas-usuario');
  }

  onClickOpes() {
    this.navCtrl.navigateForward('/listado-administraciones/detalle-examen');
  }

  onClick() {
    console.log('Mostrando Banner');
    this.admobFreeService.BannerAd();
  }

  showInterstitial() {
    this.admobFreeService.InterstitialAd();
  }

  ionViewDidEnter() {
    this.mS.actualizarNumMensajesPendientes();
    this.mS.mostrarAvisoNuevosMensajes();
  }

  ngOnInit() {
    this.mS.showAdsBanner();
  }

}
