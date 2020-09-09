import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { block } from 'bem-cn';

import Button from 'common/components/Button';

import { addUser, updateUser } from 'store/actions';

import { AsyncDispatch, RootState } from 'store/types';
import { DataSource, Organisation, UserData } from 'common/types';
import { UserFormProps } from './types';

import './UserForm.less';

const b = block('userForm');

export default function UserForm(props: UserFormProps) {
    const { record, callback = () => {} } = props;
    const organisationList = useSelector<RootState, DataSource<Organisation>>(rootState => rootState.App.organisationList);
    const { register, handleSubmit, errors } = useForm<UserData>({
        defaultValues: record,
    });

    const dispatch = useDispatch<AsyncDispatch>();

    const saveChanges = (data: UserData) => {
        dispatch(record ? updateUser(record.id, data) : addUser(data)).then(
            () => callback(true),
            () => callback(),
        );
    };
    return (
        <form className={b()} onSubmit={handleSubmit(saveChanges)}>
            <label htmlFor="firstName" className={b('label')}>Фамилия:</label>
            <input
                id="firstName"
                name="firstName"
                placeholder="Скайуокер"
                className={b('field', { error: Boolean(errors.firstName) })}
                ref={register({ required: true, maxLength: 20 })}
            />

            <label htmlFor="lastName" className={b('label')}>Имя:</label>
            <input
                id="lastName"
                name="lastName"
                placeholder="Люк"
                className={b('field', { error: Boolean(errors.lastName) })}
                ref={register({ required: true, maxLength: 20 })}
            />

            <label htmlFor="middleName" className={b('label')}>Отчество:</label>
            <input
                id="middleName"
                name="middleName"
                placeholder="Энакинович"
                className={b('field', { error: Boolean(errors.middleName) })}
                ref={register({ maxLength: 20 })}
            />

            <label htmlFor="organisationId" className={b('label')}>Организация:</label>
            <select
                id="organisationId"
                name="organisationId"
                className={b('field', { error: Boolean(errors.organisationId) })}
                ref={register({ required: true })}
            >
                <option value="">
                    Выберите организацию
                </option>
                {organisationList.map(item => (
                    <option key={item.id} value={item.id}>
                        {`${item.fullName} ${item.shortName ? ` (${item.shortName})` : ''}`}
                    </option>
                ))}
            </select>

            <label htmlFor="email" className={b('label')}>E-mail:</label>
            <input
                id="email"
                name="email"
                type="email"
                className={b('field', { error: Boolean(errors.email) })}
                placeholder="dvader@mail.com"
                ref={register({ required: true, pattern: /.+@.+\..+/i })}
            />

            <Button className={b('saver')} type="submit">Сохранить</Button>
        </form>
    );
}
