import { Component, OnInit } from '@angular/core';
import { Plantilla } from '../classes/plantilla';
import { MainService } from '../services/main-service';
import { DialogService } from '../services/dialog-service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-plantilla',
  templateUrl: './ver-plantilla.page.html',
  styleUrls: ['./ver-plantilla.page.scss'],
})
export class VerPlantillaPage implements OnInit {

  public plantilla: Plantilla;
  private id_plantilla: string;

  constructor(public navCtrl: NavController,
    public mS: MainService,
    public dialogCtrl: DialogService,
    private aR: ActivatedRoute) {

    this.id_plantilla = this.aR.snapshot.paramMap.get('id');

  }

  cargarPlantilla() {

    this.mS.api_obtener_plantilla(this.id_plantilla, (data) => {
      if (data.codigo == 0) {

        this.plantilla = new Plantilla();
        this.plantilla.cargarJson(data.plantilla);

      } else {
        console.error('Error cargando plantilla: ' + data.desc);
      }
    });

  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.cargarPlantilla();
    this.mS.showAds();
  }

}
