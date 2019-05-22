import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main-service';
import { DialogService } from '../services/dialog-service';
import { NavController } from '@ionic/angular';
import { Calculadora } from '../classes/calculadora';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listado-calculadoras',
  templateUrl: './listado-calculadoras.page.html',
  styleUrls: ['./listado-calculadoras.page.scss'],
})
export class ListadoCalculadorasPage implements OnInit {

  public calculadoras: Array<Calculadora>;

  constructor(public navCtrl: NavController,
    public mS: MainService,
    public dialogCtrl: DialogService,
    private aR: ActivatedRoute) {

    this.calculadoras = [];

  }

  onClickCalculadora(c: Calculadora) {

    switch (c.codigo) {
      case 'SAS1617ESTB':
        this.navCtrl.navigateForward('calculadora-SAS1617ESTB');
        break;
      default:
        this.dialogCtrl.presentToast('Calculadora no disponible');
        break;
    }

  }

  cargarCalculadoras() {

    this.mS.api_obtener_calculadoras((data) => {
      if (data.codigo == 0) {
        let i: number;
        let c: Calculadora;

        this.calculadoras = [];
        for (i = 0; i < data.calculadoras.length; i++) {
          c = new Calculadora();
          c.cargarJson(data.calculadoras[i]);
          this.calculadoras.push(c);
        }
      } else {
        console.error('Error cargando calculadoras: ' + data.desc);
      }
    });
  }

  ngOnInit() {
    this.cargarCalculadoras();
    this.mS.showAds();
  }

}
