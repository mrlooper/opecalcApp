import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';
import { IEstadoState } from '../state/estado.state';

export const selectEstado = (state: IAppState) => state.estado;

export const selectClientID = createSelector(
    selectEstado,
    (state: IEstadoState) => state.cid
);
