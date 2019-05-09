export class TipoAcceso {
    public nombre: string;

    constructor() {
    }

    cargarJson(json){

        this.nombre = json.nombre;

    }

}
