import { Component, OnInit, Input } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'bp-toolbar',
  templateUrl: './bptoolbar.component.html',
  styleUrls: ['./bptoolbar.component.scss'],
})
export class BPToolbarComponent implements OnInit {

  @Input() titulo: string;
  @Input() boton: string;

  constructor(public navCtrl: NavController,
    public mS: MainService) { }

  openCarrito() {
    this.navCtrl.navigateForward('detalle-carrito');
  }

  openEnviosPaqueteria() {
    this.navCtrl.navigateForward('listado-envios-paqueteria');
  }

  openMensajes() {
    this.navCtrl.navigateForward('listado-mensajes');
  }

  ngOnInit() { }

}
