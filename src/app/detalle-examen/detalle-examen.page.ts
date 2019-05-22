import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main-service';
import { DialogService } from '../services/dialog-service';
import { NavController } from '@ionic/angular';
import { Examen } from '../classes/examen';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-detalle-examen',
  templateUrl: './detalle-examen.page.html',
  styleUrls: ['./detalle-examen.page.scss'],
})
export class DetalleExamenPage implements OnInit {

  private param;
  public examen: Examen;

  constructor(public navCtrl: NavController,
    public mS: MainService,
    public dialogCtrl: DialogService,
    private iab: InAppBrowser) {

    this.param = this.mS.pageArgs.get('param');

    this.examen = this.param.examen;

  }

  onClickConvocatoria() {
    this.gotoURL(this.examen.convocatoria_url);
  }

  onClickPlantillaProvisional() {
    this.navCtrl.navigateForward('ver-plantilla/' + this.examen.plantilla_provisional_id);
  }

  onClickPlantillaProvisionalURL() {
    this.gotoURL(this.examen.plantilla_provisional_url);
  }

  onClickPlantillaDefinitiva() {
    this.navCtrl.navigateForward('ver-plantilla/' + this.examen.plantilla_definitiva_id);
  }

  onClickPlantillaDefinitivaURL() {
    this.gotoURL(this.examen.plantilla_definitiva_url);
  }

  gotoURL(url) {
    let browser = this.iab.create(url, '_blank');
  }

  ngOnInit() {
    this.mS.showAds();
  }

}
