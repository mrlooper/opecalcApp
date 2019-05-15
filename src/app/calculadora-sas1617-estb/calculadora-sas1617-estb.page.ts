import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main-service';
import { DialogService } from '../services/dialog-service';
import { NavController, NumericValueAccessor } from '@ionic/angular';

@Component({
  selector: 'app-calculadora-sas1617-estb',
  templateUrl: './calculadora-sas1617-estb.page.html',
  styleUrls: ['./calculadora-sas1617-estb.page.scss'],
})
export class CalculadoraSAS1617ESTBPage implements OnInit {

  anuladas_teorico: string;
  aciertos_teorico: string;
  errores_teorico: string;
  anuladas_practico: string;
  aciertos_practico: string;
  errores_practico: string;
  nota: number;

  constructor(public navCtrl: NavController,
    public mS: MainService,
    public dialogCtrl: DialogService) { }

  onCalcular() {
    if (!this.mS.isNormalInteger(this.anuladas_teorico)) {
      this.dialogCtrl.presentToast('Debe introducir el numero de anuladas en el teórico'); return;
    }
    if (!this.mS.isNormalInteger(this.aciertos_teorico)) {
      this.dialogCtrl.presentToast('Debe introducir el numero de aciertos en el teórico'); return;
    }
    if (!this.mS.isNormalInteger(this.errores_teorico)) {
      this.dialogCtrl.presentToast('Debe introducir el numero de errores en el teórico'); return;
    }
    if (!this.mS.isNormalInteger(this.anuladas_practico)) {
      this.dialogCtrl.presentToast('Debe introducir el numero de anuladas en el práctico'); return;
    }
    if (!this.mS.isNormalInteger(this.aciertos_practico)) {
      this.dialogCtrl.presentToast('Debe introducir el numero de aciertos en el práctico'); return;
    }
    if (!this.mS.isNormalInteger(this.errores_practico)) {
      this.dialogCtrl.presentToast('Debe introducir el numero de errores en el práctico'); return;
    }

    let an_t: number, ac_t: number, er_t: number, an_p: number, ac_p: number, er_p: number;
    let nota_t: number, nota_p: number;

    an_t = Number.parseFloat(this.anuladas_teorico);
    ac_t = Number.parseFloat(this.aciertos_teorico);
    er_t = Number.parseFloat(this.errores_teorico);
    an_p = Number.parseFloat(this.anuladas_practico);
    ac_p = Number.parseFloat(this.aciertos_practico);
    er_p = Number.parseFloat(this.errores_practico);

    nota_t = (ac_t - (er_t / 4.0 )) * (50.0 / (100.0 - an_t));
    nota_p = (ac_p - (er_p / 4.0 )) * (50.0 / (50.0 - an_p));

    this.nota = Math.round((nota_t + nota_p) * 1000000) / 1000000 ;
    this.dialogCtrl.presentToast(this.nota);

  }

  ngOnInit() {
  }

}
