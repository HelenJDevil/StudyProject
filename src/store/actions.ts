import { DataSource, Organisation, UserData, User, TableSelection } from 'common/types';
import { AsyncAction, ActionType } from './types';

export function getOrganisationList(): AsyncAction<DataSource<Organisation>> {
    return async (dispatch, getState, { api }) => {
        const data = await api.getOrganisationList();
        dispatch({
            type: ActionType.GetOrganisationList,
            payload: data,
        });
    };
}

interface GetUserPayload {
    userList: DataSource<User>, organisationList: DataSource<Organisation>,
}

export function getUserList(): AsyncAction<GetUserPayload> {
    return async (dispatch, getState, { api }) => {
        dispatch({ type: ActionType.FetchingUserList });
        try {
            const organisationList = await api.getOrganisationList();
            const userList = await api.getUserList();
            dispatch({
                type: ActionType.GetUserList,
                payload: { userList, organisationList },
            });
        } catch (error) {
            dispatch({ type: ActionType.ErrorUserList, payload: error.message });
        }
    };
}

export function addUser(userInfo: UserData): AsyncAction<User> {
    return async (dispatch, getState, { api }) => {
        const data = await api.addUser(userInfo);
        dispatch({
            type: ActionType.AddUser,
            payload: data
        });
    };
}

export function updateUser(id: number, userInfo: UserData): AsyncAction {
    return async (dispatch, getState, { api }) => {
        await api.updateUser(id, userInfo);
        dispatch({
            type: ActionType.UpdateUser,
        });
    };
}

export function deleteUser(id: number): AsyncAction {
    return async (dispatch, getState, { api }) => {
        await api.deleteUser(id);
        dispatch({ type: ActionType.DeleteUser });
    };
}

export function deleteUserGroup(selection: TableSelection): AsyncAction {
    return async (dispatch, getState, { api }) => {
        await api.deleteUserGroup(selection);
        dispatch({ type: ActionType.DeleteUserGroup });
    };
}
