export class Taquilla {
    public id: string;
   public matricula: string;
   public descripcion: string;
    
   constructor() { 
   }

   cargarJson(json){
       this.id = json.id;
       this.matricula = json.matricula;
       this.descripcion = json.descripcion;
   }
   
}