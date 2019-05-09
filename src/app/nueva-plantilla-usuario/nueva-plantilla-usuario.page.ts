import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main-service';
import { DialogService } from '../services/dialog-service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-nueva-plantilla-usuario',
  templateUrl: './nueva-plantilla-usuario.page.html',
  styleUrls: ['./nueva-plantilla-usuario.page.scss'],
})
export class NuevaPlantillaUsuarioPage implements OnInit {

  private param;
  private administracion: string;
  private ope: string;
  private tipo_acceso: string;
  private especialidad: string;
  private examen: string;
  private nombre_plantilla;

  constructor(public navCtrl: NavController,
    public mS: MainService,
    public dialogCtrl: DialogService) {

    this.param = this.mS.pageArgs.get('param');

    this.administracion = this.param.administracion.nombre;
    this.ope = this.param.ope.nombre;
    this.tipo_acceso = this.param.tipo_acceso.nombre;
    this.especialidad = this.param.especialidad.nombre;
    this.examen = this.param.examen.nombre;

  }

  onConfirmar() {
    if (this.nombre_plantilla) {
      let id_examen = this.param.examen.id;
      let nombre = this.nombre_plantilla;

      this.mS.api_alta_plantilla_usuario(id_examen, nombre, (data) => {
        if (data.codigo == 0) {
          console.log('Alta de plantilla de usuario correcta');
          this.navCtrl.navigateRoot('listado-plantillas-usuario');
        } else {
          console.error('Error alta plantilla usuario: ' + data.desc);
          this.dialogCtrl.presentToast('Error: ' + data.desc);
        }
      });

    } else {
      this.dialogCtrl.presentToast('Debe indicar un nombre para la plantilla');
    }
  }

  ngOnInit() {
  }

}
