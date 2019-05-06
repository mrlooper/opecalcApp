export class NodoCategoria {
    public nombre: string;
    public id: string;
    public imagen: string;
    public imagen_abs: string;
    public mostrar_stock: boolean;
    public hijos: Array<NodoCategoria>;
     
    constructor(datos: any) { 
        this.nombre = datos.nombre;
        this.id = datos.id;
        this.imagen = datos.imagen;
        this.imagen_abs = datos.imagen_abs;
        this.mostrar_stock = datos.mostrar_stock;
        this.hijos = [];
    }

    public nuevo_hijo(nodo: NodoCategoria){
        this.hijos.push(nodo);
    }

    public nodo_hoja(){
        return this.hijos.length == 0;
    }
 }

export class ArbolCategorias extends NodoCategoria {
    public indice: Array<NodoCategoria>;

    constructor(){
        super("RAIZ");
        this.indice = [];
    }

    cargarDatos(datos: any){
        let i;
        let hijo: NodoCategoria;

        for(i=0; i<datos.length; i++){
            hijo = this.cargarDatosNodo(datos[i]);
            this.hijos.push(hijo);
        }

        this.reconstruirIndice();
    }

    private agregarNodoIndice(n, indice){
        let i;
        indice[n.id] = n;

        for(i=0; i<n.hijos.length; i++){
            this.agregarNodoIndice(n.hijos[i], this.indice);
        }
    }

    private reconstruirIndice(){
        let i;
        this.indice = [];

        for(i=0; i<this.hijos.length; i++){
            this.agregarNodoIndice(this.hijos[i], this.indice);
        }
    }

    private cargarDatosNodo(datos_nodo: Array<any>){
        let i;
        let hijo: NodoCategoria;
        let n = new NodoCategoria(datos_nodo["cat"]);

        for(i=0; i<datos_nodo["hijos"].length; i++){
            hijo = this.cargarDatosNodo(datos_nodo["hijos"][i]);
            n.nuevo_hijo(hijo);
        }

        return n;
    }
}


