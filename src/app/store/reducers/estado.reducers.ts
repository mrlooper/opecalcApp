import { initialEstadoState, IEstadoState } from '../state/estado.state';
import { EstadoActions, EEstadoActions } from '../actions/estado.actions';

export const estadoReducers = (
    state = initialEstadoState,
    action: EstadoActions
): IEstadoState => {

    switch (action.type) {
        case EEstadoActions.SetEstado: {
            return {
                ...state,
                cid: action.payload.cid,
                did: action.payload.did,
                id_zona: action.payload.id_zona,
                taquilla: action.payload.taquilla,
                loaded: action.payload.loaded
            };
        }
        case EEstadoActions.SetClientID: {
            return {
                ...state,
                cid: action.payload
            };
        }
        case EEstadoActions.SetPerfilCliente: {
            return {
                ...state,
                perfil_cliente: action.payload
            };
        }
        case EEstadoActions.SetPerfilClienteSuccess: {
            return {
                ...state,
                perfil_cliente_success: true
            };
        }
        default:
            return state;
    }
};

