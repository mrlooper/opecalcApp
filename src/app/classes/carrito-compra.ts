import { Producto } from './producto';

export class LineaCarritoCompra {
    public producto: Producto;
    public unidades: number;

    constructor(p: Producto, unidades = 1) {
        this.producto = p;
        this.unidades = unidades;
    }
}

export class CarritoCompra {
    public lineas: Array<LineaCarritoCompra>;

    constructor() {
        this.lineas = [];
    }

    get total(): number {
        let i;
        let l: LineaCarritoCompra;
        let total: number = 0;


        for (i = 0; i < this.lineas.length; i++) {
            l = this.lineas[i];

            total += l.producto.precio_final * l.unidades;
        }

        return total;
    }

    get s_total(): string {
        return this.total.toFixed(2);
    }

    get num_unidades(): number {
        let i, num = 0;
        let l: LineaCarritoCompra;

        for (i = 0; i < this.lineas.length; i++) {
            l = this.lineas[i];
            num += l.unidades;
        }

        return num;
    }

    nuevo_producto(p: Producto, unidades = 1) {
        let l: LineaCarritoCompra;

        if (p.unidad_medida_multiple) {
            this.lineas.push(new LineaCarritoCompra(p, unidades));
        } else {
            l = this.existe_producto(p);

            if (l) {
                l.unidades += unidades;
            } else {
                this.lineas.push(new LineaCarritoCompra(p, unidades));
            }
        }
    }

    eliminar_producto(p: Producto) {
        let i;
        let l: LineaCarritoCompra;

        for (i = 0; i < this.lineas.length; i++) {
            l = this.lineas[i];
            if (l.producto.codigo == p.codigo) {
                this.lineas.splice(i, 1);
            }
        }
    }

    existe_producto(p: Producto): LineaCarritoCompra {
        let i;
        let l: LineaCarritoCompra;

        for (i = 0; i < this.lineas.length; i++) {
            l = this.lineas[i];
            if (l.producto.codigo == p.codigo) {
                return l;
            }
        }

        return null;
    }

    incrementar_unidades(p: Producto, unidades = 1) {
        let l: LineaCarritoCompra;

        l = this.existe_producto(p);

        if (l) {
            l.unidades += unidades;
        }
    }

    decrementar_unidades(p, unidades = 1) {
        let l: LineaCarritoCompra;

        l = this.existe_producto(p);

        if (l) {
            l.unidades -= unidades;

            if (l.unidades <= 0) {
                this.eliminar_producto(p);
            }
        }

    }


}
