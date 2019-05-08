import { Component, OnInit } from '@angular/core';
import { Plantilla } from '../classes/plantilla';
import { MainService } from '../services/main-service';
import { DialogService } from '../services/dialog-service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-listado-plantillas-usuario',
  templateUrl: './listado-plantillas-usuario.page.html',
  styleUrls: ['./listado-plantillas-usuario.page.scss'],
})
export class ListadoPlantillasUsuarioPage implements OnInit {

  private plantillas: Array<Plantilla>;

  constructor(public navCtrl: NavController,
    public mS: MainService,
    public dialogCtrl: DialogService) {
    this.plantillas = [];
  }

  onNuevaPlantilla(){
    this.navCtrl.navCtrl('nueva-plantilla-usuario');
  }

  cargarPlantillas() {
    this.mS.api_obtener_plantillas_usuario((data) => {
      if (data.codigo == 0) {
        let i: number;
        let p: Plantilla;

        this.plantillas = [];
        for (i = 0; i < data.plantillas.length; i++) {
          p = new Plantilla();
          p.cargarJson(data.plantillas[i]);
          this.plantillas.push(p);
        }
      } else {
        console.error('Error cargando plantillas usuario: ' + data.desc);
      }
    });
  }

  ngOnInit() {
    this.cargarPlantillas();
  }

}
