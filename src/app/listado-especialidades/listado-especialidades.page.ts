import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main-service';
import { DialogService } from '../services/dialog-service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Especialidad } from '../classes/especialidad';

@Component({
  selector: 'app-listado-especialidades',
  templateUrl: './listado-especialidades.page.html',
  styleUrls: ['./listado-especialidades.page.scss'],
})
export class ListadoEspecialidadesPage implements OnInit {

  public especialidades: Array<Especialidad>;
  private action: string;
  private param;

  constructor(public navCtrl: NavController,
    public mS: MainService,
    public dialogCtrl: DialogService,
    private aR: ActivatedRoute) {

    this.action = this.aR.snapshot.paramMap.get('action');
    this.param = this.mS.pageArgs.get('param');
    this.especialidades = [];

  }

  onClickEspecialidad(e) {
    switch (this.action) {
      case 'nueva-plantilla':
      case 'detalle-examen':
        this.param['especialidad'] = e;

        this.mS.pageArgs.push({
          param: this.param
        });
        this.navCtrl.navigateForward('listado-examenes/' + this.action);

        break;
      default:
        console.error('Action ' + this.action + ' incorrecta');
        break;
    }
  }

  cargarEspecialidades() {
    let id_ope = this.param.ope.id;
    let tipo_acceso = this.param.tipo_acceso.nombre;

    this.mS.api_obtener_especialidades(id_ope, tipo_acceso, (data) => {
      if (data.codigo == 0) {
        let i: number;
        let e: Especialidad;

        this.especialidades = [];
        for (i = 0; i < data.especialidades.length; i++) {
          e = new Especialidad();
          e.cargarJson(data.especialidades[i]);
          this.especialidades.push(e);
        }
      } else {
        console.error('Error cargando especialidades: ' + data.desc);
      }
    });
  }

  ngOnInit() {
    this.cargarEspecialidades();
    this.mS.showAds();
  }


}
