import { IEstadoState, initialEstadoState } from './estado.state';
import { PerfilCliente } from 'src/app/classes/perfil-cliente';

export interface IAppState {
    estado: IEstadoState;
}

export const initialAppState: IAppState = {
    estado: initialEstadoState,
};

export function getInitialState(): IAppState {
    return initialAppState;
}
