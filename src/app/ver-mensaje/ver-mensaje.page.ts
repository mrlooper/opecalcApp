import { Component, OnInit } from '@angular/core';
import { Mensaje } from '../classes/mensaje';
import { MainService } from '../services/main-service';
import { DialogService } from '../services/dialog-service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ver-mensaje',
  templateUrl: './ver-mensaje.page.html',
  styleUrls: ['./ver-mensaje.page.scss'],
})
export class VerMensajePage implements OnInit {

  public mensaje: Mensaje;

  constructor(public navCtrl: NavController,
    public mS: MainService,
    public dialogCtrl: DialogService) {

    this.mensaje = this.mS.pageArgs.get('mensaje');

  }

  ngOnInit() {
    this.mS.api_leer_mensaje(this.mensaje.id);
  }

}
