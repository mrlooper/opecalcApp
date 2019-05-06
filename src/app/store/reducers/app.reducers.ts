import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { estadoReducers } from './estado.reducers';

export const appRerducers: ActionReducerMap<IAppState, any> = {
    estado: estadoReducers
};



