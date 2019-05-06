import { Producto } from "./producto";

export class TipoEnvioPaquetria {

    public codigo: string;
    public nombre: string;
    public tamanio: string;
    public producto: Producto;

    constructor() {
    }

    cargarJson(json) {
        this.codigo = json.codigo;
        this.nombre = json.nombre;
        this.tamanio = json.tamanio;

        this.producto = new Producto();
        this.producto.cargarJson(json.producto);
    }
}