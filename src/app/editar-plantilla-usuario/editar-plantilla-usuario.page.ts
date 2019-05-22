import { Component, OnInit } from '@angular/core';
import { Plantilla } from '../classes/plantilla';
import { MainService } from '../services/main-service';
import { DialogService } from '../services/dialog-service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Pregunta } from '../classes/pregunta';

@Component({
  selector: 'app-editar-plantilla-usuario',
  templateUrl: './editar-plantilla-usuario.page.html',
  styleUrls: ['./editar-plantilla-usuario.page.scss'],
})
export class EditarPlantillaUsuarioPage implements OnInit {

  public plantilla: Plantilla;
  private id_plantilla: string;
  private respuestas: Array<any>;
  private opciones: string;

  constructor(public navCtrl: NavController,
    public mS: MainService,
    public dialogCtrl: DialogService,
    private aR: ActivatedRoute) {

    this.id_plantilla = this.aR.snapshot.paramMap.get('id');
    this.opciones = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.respuestas = [];

  }

  onGuardar() {
    let i;
    let p: Pregunta;
    let modificadas: Array<Pregunta> = [];

    for (i = 0; i < this.plantilla.r_preguntas.length; i++) {
      p = this.plantilla.r_preguntas[i];
      if (p.modificada) {
        modificadas.push(p);
      }
    }

    console.log(modificadas.length + ' preguntas modificadas');

    let id_plantilla = this.plantilla.id;
    this.mS.api_actualizar_plantilla_usuario(id_plantilla, modificadas, (data) => {
      if(data.codigo == 0){
        console.log('Actualizacion correcta');
        this.navCtrl.pop();
      } else{
        console.error('Error actualizando preguntas');
        this.dialogCtrl.presentToast('Error: ' + data.desc);
      }
    });
  }

  onChangeRespuesta($e) {
    console.log($e.srcElement.id + ' ' + $e.detail.value);
    let numero_pregunta: string = $e.srcElement.id;
    let respuesta: string = $e.detail.value;
    this.setRespuestaPregunta(numero_pregunta, respuesta);
  }

  setRespuestaPregunta(n: string, r: string) {
    let i;
    let p: Pregunta;
    for (i = 0; i < this.plantilla.r_preguntas.length; i++) {
      p = this.plantilla.r_preguntas[i];
      if (p.id == n) {
        p.respuesta = r;
        p.modificada = true;
      }
    }

  }

  cargarPlantilla() {

    this.mS.api_obtener_plantilla_usuario(this.id_plantilla, (data) => {
      if (data.codigo == 0) {

        this.plantilla = new Plantilla();
        this.plantilla.cargarJson(data.plantilla);

        let i;
        for (i = 0; i < this.plantilla.respuestas; i++) {
          this.respuestas.push(this.opciones[i]);
        }

      } else {
        console.error('Error cargando plantilla: ' + data.desc);
      }
    });

  }

  ngOnInit() {
    this.cargarPlantilla();
    this.mS.showAds();
  }
}
