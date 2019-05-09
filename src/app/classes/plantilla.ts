import { Especialidad } from './especialidad';
import { Ope } from './ope';
import { Administracion } from './administracion';
import { Pregunta } from './pregunta';
import { Examen } from './examen';

export class Plantilla {
    public id: string;
    public nombre: string;
    public tipo: string;
    public fechayhora_alta: string;
    public anuladas: number;
    public nota: number;
    public corregida: boolean;
    public r_especialidad: Especialidad;
    public r_ope: Ope;
    public r_administracion: Administracion;
    public r_preguntas: Array<Pregunta>;
    public r_examen: Examen;

    constructor() {
    }

    cargarJson(json) {

        this.id = json.id;
        this.nombre = json.nombre;
        this.tipo = json.tipo;
        this.fechayhora_alta = json.fechayhora_alta;
        this.anuladas = json.anuladas;
        this.nota = json.nota;
        this.corregida = json.corregida;

        if ( json.r_especialidad ) {
            this.r_especialidad = new Especialidad();
            this.r_especialidad.cargarJson(json.r_especialidad);
        }

        if ( json.r_ope ) {
            this.r_ope = new Ope();
            this.r_ope.cargarJson(json.r_ope);
        }

        if ( json.r_administracion ) {
            this.r_administracion = new Administracion();
            this.r_administracion.cargarJson(json.r_administracion);
        }

        if ( json.r_examen ) {
            this.r_examen = new Examen();
            this.r_examen.cargarJson(json.r_examen);
        }

        if ( json.r_preguntas ) {
            let i;
            let p: Pregunta;

            this.r_preguntas = [];
            for ( i = 0; i < json.r_preguntas.length; i++ ) {
                p = new Pregunta();
                p.cargarJson(json.r_preguntas[i]);
                this.r_preguntas.push(p);
            }
        }

    }

}
