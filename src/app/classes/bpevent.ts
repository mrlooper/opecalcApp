export class BPEvent {
   public evento: string;
   public datos: any;
    
   constructor(evento: string, datos: any = null) { 
       this.evento = evento;
       this.datos = datos ? datos : {};
   }
}