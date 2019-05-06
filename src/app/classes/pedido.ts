import { Producto } from './producto';

export class LineaPedido{
    public id: string;
    public codigo_producto: string;
    public precio_unidad: number;
    public unidades: number;
    public unidades_facial: string;
    public total: number;
    public en_oferta: boolean;
    public producto: Producto;
    constructor(){
    }

    get s_precio_unidad(): string {
        return this.precio_unidad.toFixed(2);
    }

    get s_total(): string {
        return this.total.toFixed(2);
    }

}

export class Pedido {
    public codigo: string;
    public fechayhora_alta: string;
    public fechayhora_pago: string;
    public fechayhora_anulacion: string;
    public estado: string;
    public anulable: boolean;
    public lineas: Array<LineaPedido>;
    public total: number;
    public matricula_taquilla: string;
    public descripcion_taquilla: string;

    constructor() {
        this.codigo = "";
        this.lineas = [];
        this.total = 0;
    }

    get s_total(): string{
        return this.total.toFixed(2);
    }

    get num_lineas(): number{
        return this.lineas.length;
    }

    nuevaLinea(lp: LineaPedido): void{
        this.lineas.push(lp);
    }

    existeProducto(p: Producto): LineaPedido{
        let i;
        let l: LineaPedido;

        for(i=0; i<this.lineas.length; i++){
            l = this.lineas[i];
            if(l.producto.codigo == p.codigo){
                return l;
            }
        }

        return null;
    }

    cargarJson(json){
        var i, dl;
        var lp: LineaPedido;

        this.codigo = json.codigo;
        this.fechayhora_alta = json.fechayhora_alta;
        this.fechayhora_pago = json.fechayhora_pago;
        this.fechayhora_anulacion = json.fechayhora_anulacion;
        this.estado = json.estado;
        this.anulable = json.anulable;
        this.total = json.total;
        this.matricula_taquilla = json.matricula_taquilla;
        this.descripcion_taquilla = json.descripcion_taquilla;

        for(i=0; i<json.lineas.length; i++){
            dl = json.lineas[i];
            lp = new LineaPedido();
            lp.id = dl.id;
            lp.codigo_producto = dl.productos_codigo;
            lp.en_oferta = dl.en_oferta;
            lp.precio_unidad = dl.precio_unidad;
            lp.unidades = dl.unidades;
            lp.unidades_facial = dl.unidades_facial;
            lp.total = lp.precio_unidad * lp.unidades;

            /* Producto */
            lp.producto = new Producto();
            lp.producto.cargarJson(dl.producto);

            this.nuevaLinea(lp);
        }        
    }

    toJson(){
        let i;
        let lp: LineaPedido;

        var datos = {
            "codigo": this.codigo,
            "lineas": [],
            "total": this.total,
            "matricula-taquilla": this.matricula_taquilla,
            "descripcion-taquilla": this.descripcion_taquilla
        };

        for(i=0; i < this.lineas.length; i++){
            lp = this.lineas[i];

            var datos_linea = {
                codigo: lp.codigo_producto,
                nombre: lp.producto.nombre,
                precio: lp.precio_unidad,
                unidades: lp.unidades
            };

            datos.lineas.push(datos_linea);
        }

        return datos;
        
    }

    
}
