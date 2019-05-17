import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main-service';
import { DialogService } from '../services/dialog-service';
import { NavController } from '@ionic/angular';
import { Mensaje } from '../classes/mensaje';

@Component({
  selector: 'app-listado-mensajes',
  templateUrl: './listado-mensajes.page.html',
  styleUrls: ['./listado-mensajes.page.scss'],
})
export class ListadoMensajesPage implements OnInit {


  private mensajes: Array<Mensaje>;
  
  constructor(public navCtrl: NavController,
    public mS: MainService,
    public dialogCtrl: DialogService) {

    this.mensajes = [];

  }

  onClickMensaje(m) {
    this.mS.pageArgs.push({'mensaje': m});
    this.navCtrl.navigateForward('ver-mensaje');
  }

  cargarMensajes() {
    this.mS.cargar_mensajes((mensajes) => {
      this.mensajes = mensajes;
    });
  }

  ngOnInit() {
    this.cargarMensajes();
    this.mS.showAds();
  }

}
