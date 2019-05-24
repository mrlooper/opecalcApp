import { Component, OnInit } from '@angular/core';
import { Plantilla } from '../classes/plantilla';
import { MainService } from '../services/main-service';
import { DialogService } from '../services/dialog-service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listado-plantillas-usuario',
  templateUrl: './listado-plantillas-usuario.page.html',
  styleUrls: ['./listado-plantillas-usuario.page.scss'],
})
export class ListadoPlantillasUsuarioPage implements OnInit {

  public plantillas: Array<Plantilla>;

  constructor(public navCtrl: NavController,
    public mS: MainService,
    public dialogCtrl: DialogService,
    private aR: ActivatedRoute) {
    this.plantillas = [];
  }

  onClickPlantilla(p) {
    this.navCtrl.navigateForward('ver-plantilla-usuario/' + p.id);
  }

  onNuevaPlantilla() {
    this.navCtrl.navigateForward('listado-administraciones/nueva-plantilla');
  }

  cargarPlantillas() {
    this.mS.api_obtener_plantillas_usuario((data) => {
      if (data.codigo == 0) {
        let i: number;
        let p: Plantilla;

        /* Invertimos el orden para tener las mas recientes antes */
        data.plantillas = data.plantillas.reverse();

        this.plantillas = [];
        for (i = 0; i < data.plantillas.length; i++) {
          p = new Plantilla();
          p.cargarJson(data.plantillas[i]);
          this.plantillas.push(p);
        }

        if (this.plantillas.length == 0) {
          this.dialogCtrl.presentConfirm('Nueva plantilla', 'No tienes ninguna plantilla ¿Quieres crear una?', () => {
            this.navCtrl.navigateForward('listado-administraciones/nueva-plantilla');
          });
        }

      } else {
        console.error('Error cargando plantillas usuario: ' + data.desc);
      }
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.cargarPlantillas();
    this.mS.showAds();
  }

}
