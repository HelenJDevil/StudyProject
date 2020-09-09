import React, { useState, useEffect, useMemo, useCallback, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { block } from 'bem-cn';

import { AsyncDispatch, RootState } from 'store/types';
import { TableSelection, DataSource, Organisation, User, Record } from 'common/types';
import { PopPosition } from 'common/components/PopConfirm';

import { deleteUser, deleteUserGroup, getUserList } from 'store/actions';

import Button, { ButtonTemplate } from 'common/components/Button';
import { PaginatedTable } from 'common/components/Table';
import Modal from 'common/components/Modal';

import UserForm from '../UserForm';

import { UserTablePattern } from './data';

import './UserTable.less';

const b = block('userTable');

const defaultSelection = { isExcluded: false, clickedList: [] };

export default function UserTable() {
    const dispatch = useDispatch<AsyncDispatch>();

    const fetching = useSelector<RootState, boolean>(rootState => rootState.App.fetching);
    const userList = useSelector<RootState, DataSource<User>>(rootState => rootState.App.userList);
    const organisationList = useSelector<RootState, DataSource<Organisation>>(rootState => rootState.App.organisationList);

    const [ selection, setSelection ] = useState<TableSelection>(defaultSelection);
    const { isExcluded, clickedList } = selection;
    const [ isVisibleModalForm, setModalFormVisibility ] = useState<boolean>(false);
    const [ editingItem, setEditingItem ] = useState<User>();

    const [ loading, setLoading ] = useState<boolean>(false);

    const hasSelection = isExcluded ? clickedList.length < userList.length : clickedList.length;

    const closeModal = () => {
        setEditingItem(undefined);
        setModalFormVisibility(false);
    };

    const openModal = (record?: User) => {
        setEditingItem(record);
        setModalFormVisibility(true);
    };

    const RowExtra: FC<{ record: Record }> = ({ record }) => {
        const onEditUser = () => {
            openModal(record as User);
        };
        const onDeleteUser = () => {
            dispatch(deleteUser(record.id)).then(() => dispatch(getUserList()));
        };
        return (
            <>
                <Button onClick={onEditUser} icon={(<i className="material-icons">edit</i>)} />
                <Button
                    onClick={onDeleteUser}
                    icon={(<i className="material-icons">delete</i>)}
                    needsConfirmation
                />
            </>
        );
    };

    const renderColumns = useMemo(() => ({
        organisationId: (value: number) => {
            const organisation = organisationList.find(item => value === item.id);
            return organisation
                ? `${organisation.fullName} ${organisation.shortName ? ` (${organisation.shortName})` : ''}`
                : '-';
        }
    }), [ organisationList ]);

    const deleteSelection = useCallback(() => {
        setLoading(true);
        dispatch(deleteUserGroup(selection)).finally(() => {
            setLoading(false);
            setSelection(defaultSelection);
            dispatch(getUserList());
        });
    }, [ selection ]);

    const editionCallback = () => {
        closeModal();
        dispatch(getUserList());
    };

    useEffect(() => {
        dispatch(getUserList());
        return () => {};
    }, []);

    return (
        <div className={b()}>
            <PaginatedTable
                dataSource={userList}
                pattern={UserTablePattern}
                renderColumns={renderColumns}
                RowExtra={RowExtra}
                loading={fetching || loading}
                withSelection
                selectionParams={{
                    ...selection,
                    setSelection,
                }}
            >
                <Button onClick={() => { openModal(); }} icon={(<i className="material-icons">add</i>)}>
                    Добавить пользователя
                </Button>
                <Button
                    template={ButtonTemplate.dangerous}
                    icon={(<i className="material-icons">delete_sweep</i>)}
                    disabled={!hasSelection}
                    onClick={deleteSelection}
                    confirmPosition={PopPosition.bottomRight}
                    needsConfirmation
                />
            </PaginatedTable>
            {isVisibleModalForm && (
                <Modal
                    title={editingItem ? 'Редактирование данных пользователя' : 'Создание пользователя'}
                    visibility={isVisibleModalForm}
                    onClose={closeModal}
                >
                    <UserForm
                        record={editingItem}
                        callback={editionCallback}
                    />
                </Modal>
                // <UserModal
                //     visibility={isVisibleModalForm}
                //     onClose={closeModal}
                //     record={editingItem}
                // callback={editionCallback}
                // />
            )}
        </div>
    );
}
