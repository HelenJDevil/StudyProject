import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import Middlewares from 'middlewares/types';
import { DataSource, Organisation, User } from 'common/types';

export interface AppState {
    userList: DataSource<User>,
    organisationList: DataSource<Organisation>,
    fetching: boolean,
    error: string,
}
export interface RootState {
    App: AppState,
}

export enum ActionType {
    FetchingUserList = 'FetchingUserList',
    GetOrganisationList = 'GetOrganisationList',
    ErrorUserList = 'ErrorUserList',
    GetUserList = 'GetUserList',
    AddUser = 'AddUser',
    UpdateUser = 'UpdateUser',
    DeleteUser = 'DeleteUser',
    DeleteUserGroup = 'DeleteUserGroup'
}

export interface IAction<DataType = any> extends Action<ActionType> {
    type: ActionType,
    payload?: DataType,
}

export type ExtendedAction<DataType = any, ReturnValue = void> = ThunkAction<ReturnValue, RootState, Middlewares, IAction<DataType>>;

export type AsyncAction<DataType = any, ReturnValue = void> = ExtendedAction<DataType, Promise<ReturnValue>>;

export type AsyncDispatch<DataType = any> = ThunkDispatch<RootState, Middlewares, IAction<DataType>>;
