export class Hueco {
    public id: string;
   public etiqueta: string;
   public activo: boolean;
   public disponible: boolean;
    
   constructor() { 
   }

   cargarJson(json){
       this.id = json.id;
       this.etiqueta = json.etiqueta;
       this.activo = json.activo;
       this.disponible = json.disponible;
   }
   
}