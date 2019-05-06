export class MetodoPago {
    public id: string;
   public codigo: string;
   public nombre: string;
   public imagen: string;
   public imagen_abs: string;
   public mostrar: boolean;
   public metodo_inicio_pago: string;
    
   constructor() { 
   }

   cargarJson(json){
       this.id = json.id;
       this.codigo = json.codigo;
       this.nombre = json.nombre;
       this.imagen = json.imagen;
       this.imagen_abs = json.imagen_abs;
       this.mostrar = json.mostrar;
       this.metodo_inicio_pago = json.metodo_inicio_pago;
   }
}