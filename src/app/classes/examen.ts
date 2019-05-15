export class Examen {
    public id: string;
    public nombre: string;
    public convocatoria_url: string;
    public plantilla_provisional_id: string;
    public plantilla_provisional_url: string;
    public plantilla_definitiva_id: string;
    public plantilla_definitiva_url: string;

    constructor() {
    }

    cargarJson(json){

        this.id = json.id;
        this.nombre = json.nombre;
        this.convocatoria_url = json.convocatoria_url;
        this.plantilla_provisional_id = json.plantilla_provisional_id;
        this.plantilla_provisional_url = json.plantilla_provisional_url;
        this.plantilla_definitiva_id = json.plantilla_definitiva_id;
        this.plantilla_definitiva_url = json.plantilla_definitiva_url;


    }

}
