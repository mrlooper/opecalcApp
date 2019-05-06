import { Action } from '@ngrx/store';
import { IEstadoState } from '../state/estado.state';
import { PerfilCliente } from 'src/app/classes/perfil-cliente';

export enum EEstadoActions {
    SetEstado = '[Estado] Set Estado',
    GetClientID = '[Estado] Get ClientID',
    SetClientID = '[Estado] Set ClientID',
    SetPerfilCliente = '[Estado] Set PerfilCliente',
    SetPerfilClienteSuccess = '[Estado] Set PerfilClienteSuccess',
}

export class SetEstado implements Action {
    public readonly type = EEstadoActions.SetEstado;

    constructor(public payload: IEstadoState) { }
}

export class GetClientID implements Action {
    public readonly type = EEstadoActions.GetClientID;
}

export class SetClientID implements Action {
    public readonly type = EEstadoActions.SetClientID;

    constructor(public payload: string) { }
}

export class SetPerfilCliente implements Action {
    public readonly type = EEstadoActions.SetPerfilCliente;

    constructor(public payload: PerfilCliente) { }
}

export class SetPerfilClienteSuccess implements Action {
    public readonly type = EEstadoActions.SetPerfilClienteSuccess;
}



export type EstadoActions =
    | SetEstado
    | GetClientID
    | SetClientID
    | SetPerfilCliente
    | SetPerfilClienteSuccess;
