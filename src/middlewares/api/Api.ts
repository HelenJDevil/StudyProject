import { DataSource, User, Organisation, TableSelection, UserData } from 'common/types';
import BaseApi from './BaseApi';

class Api extends BaseApi {
    getOrganisationList = (): DataSource<Organisation> => {
        const data: DataSource<Organisation> = this.mockedServer.getOrganisationList();
        // const { data } = this.sendGet<DataSource<Organisation>>('url');

        return data;
    };

    getUserList = (): DataSource<User> => {
        const data: DataSource<User> = this.mockedServer.getUserList();
        // const { data } = this.sendGet<DataSource<User>>('url');

        return data;
    };

    private getCorrectUserData = (data: UserData) => (
        { ...data, organisationId: Number(data.organisationId) }
    );

    addUser = (userData: UserData): User => {
        const data: User = this.mockedServer.addUser(this.getCorrectUserData(userData));
        // const { data } = this.sendGet<User>('url');

        return data;
    };

    updateUser = (id: number, userData: UserData) => {
        const data = this.mockedServer.updateUser(id, this.getCorrectUserData(userData));
        // const { data } = this.sendGet<User>('url');

        return data;
    };

    deleteUser = (id: number) => {
        const data = this.mockedServer.deleteUser(id);
        // const { data } = this.sendGet<User>('url');

        return data;
    };

    deleteUserGroup = (selection: TableSelection) => {
        const data = this.mockedServer.deleteUserGroup(selection);
        // const { data } = this.sendGet<User>('url');

        return data;
    };
}

export default Api;
