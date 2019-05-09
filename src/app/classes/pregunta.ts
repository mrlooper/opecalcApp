export class Pregunta {
    public id: string;
    public parte: string;
    public secuencia: string;
    public pregunta: string;
    public respuesta: string;
    public anulada: boolean;

    constructor() {
    }

    cargarJson(json){

        this.id = json.id;
        this.parte = json.parte;
        this.secuencia = json.secuencia;
        this.pregunta = json.pregunta;
        this.respuesta = json.respuesta;
        this.anulada = json.anulada;

    }

}
