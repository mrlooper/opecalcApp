import { Taquilla } from "./taquilla";
import { Hueco } from "./hueco";

export class EnvioPaqueteria {
    public id: string;
   public codigo: string;
   public fechayhora_alta: string;
   public fechayhora_deposito: string;
   public r_nombre: string;
   public r_apellidos: string;
   public r_empresa: string;
   public r_direccion_1: string;
   public r_direccion_2: string;
   public r_cp: string;
   public r_telefono: string;
   public d_nombre: string;
   public d_apellidos: string;
   public d_empresa: string;
   public d_direccion_1: string;
   public d_direccion_2: string;
   public d_cp: string;
   public d_telefono: string;
   public ancho: number;
   public alto: number;
   public largo: number;
   public peso: number;
   public estado: string;
   public notas: string;
   public anulable: boolean;

   public taquilla: Taquilla;
   public hueco: Hueco;
    
   constructor() { 
   }

   cargarJson(json){
       this.id = json.id;
       this.codigo = json.codigo;
       this.fechayhora_alta = json.fechayhora_alta;
       this.fechayhora_deposito = json.fechayhora_deposito;
       this.r_nombre = json.r_nombre;
       this.r_apellidos = json.r_apellidos;
       this.r_empresa = json.r_empresa;
       this.r_direccion_1 = json.r_direccion_1;
       this.r_direccion_2 = json.r_direccion_2;
       this.r_cp = json.r_cp;
       this.r_telefono = json.r_telefono;
       this.d_nombre = json.d_nombre;
       this.d_apellidos = json.d_apellidos;
       this.d_empresa = json.d_empresa;
       this.d_direccion_1 = json.d_direccion_1;
       this.d_direccion_2 = json.d_direccion_2;
       this.d_cp = json.d_cp;
       this.d_telefono = json.d_telefono;       
       this.ancho = json.ancho;
       this.alto = json.alto;
       this.largo = json.largo;
       this.peso = json.peso;
       this.estado = json.estado;
       this.notas = json.notas;
       this.anulable = json.anulable;

       if(json.taquilla){
           this.taquilla = new Taquilla();
           this.taquilla.cargarJson(json.taquilla);
       }

       if(json.hueco){
        this.hueco = new Hueco();
        this.hueco.cargarJson(json.hueco);
        }

   }
   
}