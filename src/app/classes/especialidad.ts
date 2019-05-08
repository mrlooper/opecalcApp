export class Especialidad {
    public id: string;
    public nombre: string;
    public tipo_acceso: string;

    constructor() {
    }

    cargarJson(json){

        this.id = json.id;
        this.nombre = json.nombre;
        this.tipo_acceso = json.tipo_acceso;

    }

}
