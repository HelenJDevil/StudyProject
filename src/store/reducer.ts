import { ActionType, IAction, AppState } from './types';

const defaultError = 'Что-то пошло не так';

const initialState: AppState = {
    userList: [],
    organisationList: [],
    fetching: false,
    error: defaultError,
};

export default function (state: AppState = initialState, action: IAction): AppState {
    switch (action.type) {
        case ActionType.FetchingUserList: {
            return {
                ...state,
                fetching: true,
            };
        }
        case ActionType.GetUserList: {
            return {
                ...state,
                fetching: false,
                userList: action.payload.userList,
                organisationList: action.payload.organisationList,
            };
        }
        case ActionType.ErrorUserList: {
            return {
                ...state,
                error: action.payload || defaultError,
            };
        }
        case ActionType.GetOrganisationList: {
            return {
                ...state,
                organisationList: action.payload,
            };
        }
        default: {
            return state;
        }
    }
}
