import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main-service';
import { DialogService } from '../services/dialog-service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { TipoAcceso } from '../classes/tipo-acceso';

@Component({
  selector: 'app-listado-tipos-acceso',
  templateUrl: './listado-tipos-acceso.page.html',
  styleUrls: ['./listado-tipos-acceso.page.scss'],
})
export class ListadoTiposAccesoPage implements OnInit {

  private tipos_acceso: Array<TipoAcceso>;
  private action: string;
  private param;

  constructor(public navCtrl: NavController,
    public mS: MainService,
    public dialogCtrl: DialogService,
    private aR: ActivatedRoute) {

    this.action = this.aR.snapshot.paramMap.get('action');
    this.param = this.mS.pageArgs.get('param');
    this.tipos_acceso = [];

  }

  onClickTipoAcceso(t) {
    switch (this.action) {
      case 'nueva-plantilla':
      case 'detalle-examen':
        this.param['tipo_acceso'] = t;

        this.mS.pageArgs.push({
          param: this.param
        });
        this.navCtrl.navigateForward('listado-especialidades/' + this.action);

        break;
      default:
        console.error('Action ' + this.action + ' incorrecta');
        break;
    }
  }

  cargarTiposAcceso() {
    this.mS.api_obtener_tipos_acceso((data) => {
      if (data.codigo == 0) {
        let i: number;
        let t: TipoAcceso;

        this.tipos_acceso = [];
        for (i = 0; i < data.tipos_acceso.length; i++) {
          t = new TipoAcceso();
          t.cargarJson(data.tipos_acceso[i]);
          this.tipos_acceso.push(t);
        }
      } else {
        console.error('Error cargando tipos de acceso: ' + data.desc);
      }
    });
  }

  ngOnInit() {
    this.cargarTiposAcceso();
    this.mS.showAds();
  }


}
