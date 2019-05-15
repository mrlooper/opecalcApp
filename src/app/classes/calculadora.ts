export class Calculadora {
    public id: string;
    public codigo: string;
    public nombre: string;
    public activo: boolean;

    constructor() {
    }

    cargarJson(json){

        this.id = json.id;
        this.codigo = json.codigo;
        this.nombre = json.nombre;
        this.activo = json.activo;

    }

}
