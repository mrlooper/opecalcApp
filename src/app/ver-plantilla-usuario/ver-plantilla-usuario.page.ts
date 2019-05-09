import { Component, OnInit } from '@angular/core';
import { Plantilla } from '../classes/plantilla';
import { MainService } from '../services/main-service';
import { DialogService } from '../services/dialog-service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-plantilla-usuario',
  templateUrl: './ver-plantilla-usuario.page.html',
  styleUrls: ['./ver-plantilla-usuario.page.scss'],
})
export class VerPlantillaUsuarioPage implements OnInit {

  private plantilla: Plantilla;
  private id_plantilla: string;

  constructor(public navCtrl: NavController,
    public mS: MainService,
    public dialogCtrl: DialogService,
    private aR: ActivatedRoute) {

    this.id_plantilla = this.aR.snapshot.paramMap.get('id');

  }

  cargarPlantilla() {

    this.mS.api_obtener_plantilla_usuario(this.id_plantilla, (data) => {
      if (data.codigo == 0) {

        this.plantilla = new Plantilla();
        this.plantilla.cargarJson(data.plantilla);

      } else {
        console.error('Error cargando plantilla: ' + data.desc);
      }
    });

  }

  ngOnInit() {
    this.cargarPlantilla();
  }

}
