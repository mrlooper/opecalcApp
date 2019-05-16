import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main-service';
import { DialogService } from '../services/dialog-service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Examen } from '../classes/examen';

@Component({
  selector: 'app-listado-examenes',
  templateUrl: './listado-examenes.page.html',
  styleUrls: ['./listado-examenes.page.scss'],
})
export class ListadoExamenesPage implements OnInit {

  private examenes: Array<Examen>;
  private action: string;
  private param;

  constructor(public navCtrl: NavController,
    public mS: MainService,
    public dialogCtrl: DialogService,
    private aR: ActivatedRoute) {

    this.action = this.aR.snapshot.paramMap.get('action');
    this.param = this.mS.pageArgs.get('param');
    this.examenes = [];

  }

  onClickExamen(e) {
    switch (this.action) {
      case 'nueva-plantilla':

        this.param['examen'] = e;

        this.mS.pageArgs.push({
          param: this.param
        });
        this.navCtrl.navigateForward('nueva-plantilla-usuario');

        break;

      case 'detalle-examen':
        this.param['examen'] = e;

        this.mS.pageArgs.push({
          param: this.param
        });
        this.navCtrl.navigateForward('detalle-examen');

        break;

      default:
        console.error('Action ' + this.action + ' incorrecta');
        break;
    }
  }

  cargarExamenes() {
    let id_especialidad = this.param.especialidad.id;

    this.mS.api_obtener_examenes(id_especialidad, (data) => {
      if (data.codigo == 0) {
        let i: number;
        let e: Examen;

        this.examenes = [];
        for (i = 0; i < data.examenes.length; i++) {
          e = new Examen();
          e.cargarJson(data.examenes[i]);
          this.examenes.push(e);
        }
      } else {
        console.error('Error cargando examenes: ' + data.desc);
      }
    });
  }

  ngOnInit() {
    this.cargarExamenes();
    this.mS.showAds();
  }


}
