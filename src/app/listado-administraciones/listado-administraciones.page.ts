import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main-service';
import { DialogService } from '../services/dialog-service';
import { NavController } from '@ionic/angular';
import { Administracion } from '../classes/administracion';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listado-administraciones',
  templateUrl: './listado-administraciones.page.html',
  styleUrls: ['./listado-administraciones.page.scss'],
})
export class ListadoAdministracionesPage implements OnInit {

  private administraciones: Array<Administracion>;
  private action: string;

  constructor(public navCtrl: NavController,
    public mS: MainService,
    public dialogCtrl: DialogService,
    private aR: ActivatedRoute) {

    this.action = this.aR.snapshot.paramMap.get('action');
    this.administraciones = [];

  }

  onClickAdministracion(a) {
    this.mS.pageArgs.push({
      param: {
        administracion: a
      }
    });
    this.navCtrl.navigateForward('listado-opes/' + this.action);
  }

  cargarAdministraciones() {
    this.mS.api_obtener_administraciones((data) => {
      if (data.codigo == 0) {
        let i: number;
        let a: Administracion;

        this.administraciones = [];
        for (i = 0; i < data.administraciones.length; i++) {
          a = new Administracion();
          a.cargarJson(data.administraciones[i]);
          this.administraciones.push(a);
        }
      } else {
        console.error('Error cargando administraciones: ' + data.desc);
      }
    });
  }

  ngOnInit() {
    this.cargarAdministraciones();
  }

}
