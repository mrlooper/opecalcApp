export class Mensaje {
    public id: string;
    public fechayhora: string;
    public titulo: string;
    public texto: string;
    public pendiente: boolean;

    constructor() {
    }

    cargarJson(json) {

        this.id = json.id;
        this.fechayhora = json.fechayhora;
        this.titulo = json.titulo;
        this.texto = json.texto;
        this.pendiente = json.pendiente;

    }

}
