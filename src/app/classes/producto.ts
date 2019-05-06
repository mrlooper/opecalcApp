export class Producto {
    public codigo: string;
    public referencia: string;
    public nombre: string;
    public descripcion: string;
    public en_oferta: boolean;
    public precio: number;
    public precio_oferta: number;
    public unidad_medida_codigo: string;
    public unidad_medida_facial: string;
    public unidad_medida_multiple: boolean;
    public multiples_unidades: boolean;
    public imagenes: Array<string>;
    public thumbnails: Array<string>;
    public categorias: Array<string>;
    public cantidad: number;
    public cantidad_minima: number;
    public modo_cantidad: string; /* U (unidades), D (disponibilidad), N (ninguno) */
    public pedidos_periodicos: boolean;
    public multiplicadores: Array<any>;

    constructor() {
    }

    get precio_final(): number{
        return this.en_oferta ? this.precio_oferta : this.precio;
    }

    get permite_incremento_unidades(): boolean{
        return this.multiples_unidades;
    }

    get s_precio(): string {
        return this.precio.toFixed(2);
    }

    get s_precio_con_unidad(): string {
        return this.precio.toFixed(2) + " " + this.unidad_medida_facial;
    }

    get s_precio_oferta(): string {
        return this.precio_oferta.toFixed(2);
    }

    get s_precio_final(): string {
        return this.precio_final.toFixed(2);
    }

    get s_precio_final_con_unidad(): string {
        return this.precio_final.toFixed(2) + " " + this.unidad_medida_facial;
    }

    get s_categorias(): string {
        return this.categorias.join(" | ");
    }

    public imagen_principal() {
        return this.imagenes.length ? this.imagenes[0] : "";
    }

    public thumbnail_principal() {
        return this.thumbnails.length ? this.thumbnails[0] : "";
    }

    /**
     * Comprueba si hay stock suficiente para u unidades
     * @param u Numero de unidades
     */
    public hay_stock(u: number){
        let hay_stock: boolean = false;

        switch(this.modo_cantidad){
            /* Si hay cantidad, no se comprueba cuanta */
            case "D":
                hay_stock = this.cantidad > 0;
            break;

            /* Para el modo U, se comprueba si hay unidades suficientes */
            case "U":
                hay_stock = this.cantidad >= u;
            break;

            /* Sin control de stock */
            case "N":
                hay_stock = true;
            break;
        }

        return hay_stock;
    }

    public cargarJson(json){
        this.codigo = json.codigo;
        this.referencia = json.referencia;
        this.nombre = json.nombre;
        this.descripcion = json.descripcion;
        this.en_oferta = json.en_oferta;
        this.precio = json.precio;
        this.precio_oferta = json.precio_oferta;
        this.imagenes = json.imagenes;
        this.categorias = json.categorias;
        this.thumbnails = json.thumbnails;         
        this.cantidad = json.cantidad;         
        this.cantidad_minima = json.cantidad_minima;         
        this.modo_cantidad = json.modo_cantidad;  
        this.unidad_medida_codigo = json.unidad_medida_codigo;
        this.unidad_medida_facial = json.unidad_medida_facial;       
        this.unidad_medida_multiple = json.unidad_medida_multiple;
        this.multiples_unidades = json.multiples_unidades;
        this.pedidos_periodicos = json.pedidos_periodicos;
        this.multiplicadores = json.multiplicadores;
    }
}

export class ListadoProductos {
    public id_categoria: string;
    public productos: Array<Producto>;
    public siguiente_pagina: number;
    public hay_mas: boolean;

    constructor() {
        this.productos = [];
        this.siguiente_pagina = 1;
        this.hay_mas = true;
    }

    nuevo_producto(p: Producto) {
        this.productos.push(p);
    }

    nuevos_productos(productos: Array<any>) {
        this.productos.concat(productos);
    }
}