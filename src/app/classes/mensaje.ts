export class Mensaje {
    public id: string;
   public fecha: string;
   public pendiente: boolean;
   public remitente: string;
   public asunto: string;
   public texto: string;
    
   constructor() { 
   }

   cargarJson(json){
       this.id = json.id;
    this.fecha = json.fecha;
    this.pendiente = json.pendiente;
    this.remitente = json.remitente;
    this.asunto = json.asunto;
    this.texto = json.texto;
   }
}