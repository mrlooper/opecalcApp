import { Pedido } from './pedido';

export class Cliente {
    public movil: string;
    public nombre: string;
    public direccion: string;
    public dni: string;
    public email: string;
}

export class PerfilCliente {
    public datos: Cliente;
    public num_mensajes_pendientes: number;
    public num_envios_paqueteria: number;
    public num_envios_paqueteria_pendientes: number;
    public num_lineas_pedidos_periodicos: number;
    public pedido: Pedido;

    cargarJson(json) {
        let c: Cliente = new Cliente();

        c.movil = json.cliente.movil;
        c.nombre = json.cliente.nombre;
        c.direccion = json.cliente.direccion;
        c.dni = json.cliente.dni;
        c.email = json.cliente.email;

        this.datos = c;
        this.num_mensajes_pendientes = json.num_mensajes_pendientes;
        this.num_envios_paqueteria = json.num_envios_paqueteria;
        this.num_envios_paqueteria_pendientes = json.num_envios_paqueteria_pendientes;
        this.num_lineas_pedidos_periodicos = json.num_lineas_pedidos_periodicos;

        if (json.pedido) {
            this.pedido = new Pedido();
            this.pedido.cargarJson(json.pedido);
        }
    }


}
