import React, { useMemo, useCallback, ReactNode, FC, ChangeEvent } from 'react';
import { block } from 'bem-cn';

import withPagination from 'common/components/WithPagination';

import Row from './Row';
import Spin from '../Spin';
import { TableProps } from './types';

import './Table.less';

const defaultSelectionParams = { isExcluded: false, clickedList: [], setSelection: () => {} };

const b = block('table');

const Table: FC<TableProps> = (props) => {
    const {
        className, pattern, dataSource, RowExtra, renderColumns = {},
        loading = false, withSelection = false, selectionParams = defaultSelectionParams,
    } = props;
    const { isExcluded, clickedList, setSelection } = selectionParams;

    const getSelectionPropsById = useCallback((id: number) => (withSelection ? {
        checked: isExcluded ? !clickedList.some(item => item === id) : clickedList.some(item => item === id),
        checkRecord: (checked: boolean) => {
            const clicked = isExcluded ? !checked : checked;
            const newClickedList = clicked ? [ ...clickedList, id ] : clickedList.filter(item => item !== id);
            setSelection({ isExcluded, clickedList: newClickedList });
        },
    } : null), [ withSelection, isExcluded, clickedList, setSelection ]);

    const bodyContent: ReactNode = useMemo(() => (dataSource.length ? (
        <tbody>
            {dataSource.map(record => (
                <Row
                    key={record.id}
                    b={b}
                    pattern={pattern}
                    renderColumns={renderColumns}
                    record={record}
                    Extra={RowExtra}
                    withSelection={withSelection}
                    {...getSelectionPropsById(record.id)}
                />
            ))}
        </tbody>
    ) : (
        <div className={b('emptyBlock')}>Нет данных</div>
    )), [ dataSource, withSelection, pattern, renderColumns, RowExtra, getSelectionPropsById ]);

    const selectAll = useMemo(() => {
        if (withSelection) {
            const onCheckAll = (event: ChangeEvent<HTMLInputElement>) => {
                const { target: { checked } } = event;
                setSelection({ isExcluded: checked, clickedList: [] });
            };
            return (
                <th className={b('cell', { header: true, selection: true })}>
                    <input
                        type="checkbox"
                        checked={isExcluded}
                        onChange={onCheckAll}
                    />
                </th>
            );
        }
    }, [ withSelection, isExcluded, setSelection ]);
    return (
        <div className={b('wrapper').mix(className)}>
            <Spin spinning={loading}>
                <table className={b()}>
                    <thead>
                        <tr className={b('row', { header: true }).mix('commonHeader')}>
                            {selectAll}
                            {pattern.map(column => (
                                <th
                                    key={column.key}
                                    className={b('cell', { header: true })}
                                >
                                    {column.title}
                                </th>
                            ))}
                            {RowExtra ? (
                                <th
                                    key="actions"
                                    className={b('cell', { header: true })}
                                >
                                    Действия
                                </th>
                            ) : null}
                        </tr>
                    </thead>
                    {bodyContent}
                </table>
            </Spin>
        </div>
    );
};

export const PaginatedTable = withPagination<TableProps>(Table);
export default Table;
