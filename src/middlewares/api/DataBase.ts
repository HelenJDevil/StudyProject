import { DataSource, UserData, User, Organisation, TableSelection } from 'common/types';

export default class DataBase {
    private userTable: DataSource<User>;

    private lastUserId: number;

    private readonly organisationTable: DataSource<Organisation>;

    constructor() {
        this.userTable = [
            {
                id: 1,
                firstName: 'Сайнаков',
                lastName: 'Николай',
                middleName: 'Александрович',
                organisationId: 1,
                email: 'mail1@mail.ru',
            },
            {
                id: 2,
                firstName: 'Можаева',
                lastName: 'Галина',
                middleName: 'Васильевна',
                displayName: 'Можаева Галина',
                organisationId: 1,
                email: 'mail2@mail.ru',
            },
            {
                id: 3,
                firstName: 'Замятин',
                lastName: 'Александр',
                middleName: 'Владимирович',
                organisationId: 1,
                email: 'mail3@mail.ru',
                password: '123',
            },
            {
                id: 4,
                firstName: 'Галажинский',
                lastName: 'Эдуард',
                middleName: 'Владимирович',
                organisationId: 1,
                email: 'mail4@mail.ru',
            },
            {
                id: 5,
                firstName: 'Эмер',
                lastName: 'Юлия',
                middleName: 'Антоновна',
                organisationId: 2,
                email: 'mail5@mail.ru',
            },
            {
                id: 6,
                firstName: 'Николаев',
                lastName: 'Виктор',
                middleName: 'Владимирович',
                organisationId: 2,
                email: 'mail6@mail.ru',
            },
            {
                id: 7,
                firstName: 'Фещенко',
                lastName: 'Артём',
                middleName: 'Викторович',
                organisationId: 2,
                email: 'mail7@mail.ru',
            },
            {
                id: 8,
                firstName: 'Марухина',
                lastName: 'Ольга',
                middleName: 'Владимировна',
                organisationId: 3,
                email: 'mail8@mail.ru',
            },
        ];
        this.lastUserId = 8;
        this.organisationTable = [
            {
                id: 1,
                fullName: 'Томский государственный университет',
                shortName: 'ТГУ',
            },
            {
                id: 2,
                fullName: 'Московский государственный университет имени М.В.Ломоносова',
                shortName: 'МГУ',
            },
            {
                id: 3,
                fullName: 'ООО "Rubius Group"',
                shortName: 'Rubius',
            },
        ];
    }

    getUserList = (): DataSource<User> => this.userTable;

    getOrganisationList = (): DataSource<Organisation> => this.organisationTable;

    addUser = (data: UserData): User => {
        const id = ++this.lastUserId;
        const record: User = { ...data, id };
        this.userTable = [ record, ...this.userTable ];
        return record;
    };

    updateUser = (id: number, data: UserData) => {
        this.userTable = this.userTable.map(item => (
            item.id === id ? { ...item, ...data, id } : item
        ));
    };

    deleteUser = (id: number) => {
        this.userTable = this.userTable.filter(item => item.id !== id);
    };

    deleteUserGroup = ({ isExcluded, clickedList }: TableSelection) => {
        this.userTable = this.userTable.filter((user) => {
            type CheckFunc = (x: number) => void;
            const checkFunc: CheckFunc = isExcluded ? (item => item === user.id) : (item => item !== user.id);
            return clickedList.some(checkFunc);
        });
    };
}
