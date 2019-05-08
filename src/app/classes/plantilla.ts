import { Especialidad } from './especialidad';
import { Ope } from './ope';
import { Administracion } from './administracion';

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

    constructor() {
    }

    cargarJson(json){

        this.id = json.id;
        this.nombre = json.nombre;
        this.tipo = json.tipo;
        this.fechayhora_alta = json.fechayhora_alta;
        this.anuladas= json.anuladas;
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

    }

}
