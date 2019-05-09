export class Examen {
    public id: string;
    public nombre: string;

    constructor() {
    }

    cargarJson(json){

        this.id = json.id;
        this.nombre = json.nombre;

    }

}
