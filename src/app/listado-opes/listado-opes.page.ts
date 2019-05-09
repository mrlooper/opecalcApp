import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main-service';
import { DialogService } from '../services/dialog-service';
import { NavController } from '@ionic/angular';
import { Ope } from '../classes/ope';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listado-opes',
  templateUrl: './listado-opes.page.html',
  styleUrls: ['./listado-opes.page.scss'],
})
export class ListadoOpesPage implements OnInit {

  private opes: Array<Ope>;
  private action: string;
  private param;

  constructor(public navCtrl: NavController,
    public mS: MainService,
    public dialogCtrl: DialogService,
    private aR: ActivatedRoute) {

    this.action = this.aR.snapshot.paramMap.get('action');
    this.param = this.mS.pageArgs.get('param');
    this.opes = [];

    console.log(this.param);

  }

  onClickOpe(o) {
    switch (this.action) {
      case 'nueva-plantilla':
        this.param['ope'] = o;

        this.mS.pageArgs.push({
          param: this.param
        });
        this.navCtrl.navigateForward('listado-tipos-acceso/' + this.action);

        break;
      default:
        console.error('Action ' + this.action + ' incorrecta');
        break;
    }
  }

  cargarOpes() {
    let id_administracion = this.param.administracion.id;

    this.mS.api_obtener_opes(id_administracion, (data) => {
      if (data.codigo == 0) {
        let i: number;
        let o: Ope;

        this.opes = [];
        for (i = 0; i < data.opes.length; i++) {
          o = new Ope();
          o.cargarJson(data.opes[i]);
          this.opes.push(o);
        }
      } else {
        console.error('Error cargando opes: ' + data.desc);
      }
    });
  }

  ngOnInit() {
    this.cargarOpes();
  }

}
