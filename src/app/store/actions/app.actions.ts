import { Action } from '@ngrx/store';
import { PerfilCliente } from 'src/app/classes/perfil-cliente';


export enum EAppActions {
    GetEstado = '[App] Get Estado',
}

export class GetEstado implements Action {
    public readonly type = EAppActions.GetEstado;
}

export type AppActions =
    | GetEstado;
