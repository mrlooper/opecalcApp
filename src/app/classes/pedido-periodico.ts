import { Producto } from './producto';

export class LineaPedidoPeriodico{
    public id: string;
    public activo: boolean;
    public en_oferta: boolean;
    public unidades: number;
    public unidades_facial: string;
    public matricula_taquilla: string;
    public l: boolean;
    public m: boolean;
    public x: boolean;
    public j: boolean;
    public v: boolean;
    public s: boolean;
    public d: boolean;
    public producto: Producto;

    constructor(){
    }

    get s_precio_unidad(): string {
        return this.producto.s_precio_final;
    }

    get s_dias_reparto(): string {
        var dias = [];

        if(this.l) dias.push("l");
        if(this.m) dias.push("m");
        if(this.x) dias.push("x");
        if(this.j) dias.push("j");
        if(this.v) dias.push("v");
        if(this.s) dias.push("s");
        if(this.d) dias.push("d");

        return dias.join(",");
    }

    cargarJson(json){
        this.id = json.id;
        this.activo = json.activo;
        this.en_oferta = json.en_oferta;
        this.unidades = json.unidades;
        this.unidades_facial = json.unidades_facial;
        this.matricula_taquilla = json.matricula_taquilla;
        this.l = json.l;
        this.m = json.m;
        this.x = json.x;
        this.j = json.j;
        this.v = json.v;
        this.s = json.s;
        this.d = json.d;

        if(json.producto){
            this.producto = new Producto();
            this.producto.cargarJson(json.producto);
        }
    }

}

export class PedidoPeriodico {
    public activo: boolean;
    public lineas: Array<LineaPedidoPeriodico>;
    public matricula_taquilla: string;
    public descripcion_taquilla: string;

    constructor() {
        this.lineas = [];
    }

    ordenar(){
        function cmp(a: LineaPedidoPeriodico, b: LineaPedidoPeriodico){
            if(a.producto.nombre > b.producto.nombre){
                return 1;
            }
            if(a.producto.nombre < b.producto.nombre){
                return -1;
            }

            return 0;
        }

        this.lineas.sort(cmp);
    }

    get num_lineas(): number{
        return this.lineas.length;
    }

    nuevaLinea(lp: LineaPedidoPeriodico): void{
        this.lineas.push(lp);
    }

    existeProducto(p: Producto): LineaPedidoPeriodico{
        let i;
        let l: LineaPedidoPeriodico;

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
        var lp: LineaPedidoPeriodico;

        this.activo = json.activo;
        this.matricula_taquilla = json.matricula_taquilla;
        this.descripcion_taquilla = json.descripcion_taquilla;

        for(i=0; i<json.lineas.length; i++){
            dl = json.lineas[i];
            lp = new LineaPedidoPeriodico();
            lp.cargarJson(dl);

            this.nuevaLinea(lp);
        }        
    }
    
}
