import { PerfilCliente } from 'src/app/classes/perfil-cliente';

export interface IEstadoState {
    did: string;
    cid: string;
    id_zona: string;
    taquilla: string;
    perfil_cliente: PerfilCliente;
    loaded: boolean;
    perfil_cliente_success: boolean;
}

export const initialEstadoState: IEstadoState = {
    did: null,
    cid: null,
    id_zona: null,
    taquilla: null,
    perfil_cliente: null,
    loaded: false,
    perfil_cliente_success: false
};
