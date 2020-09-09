import React, { useMemo, ChangeEvent } from 'react';

import Cell from '../Cell';
import { RowProps } from '../types';

export default function Row(props: RowProps) {
    const {
        b, record, pattern, renderColumns = {}, Extra,
        withSelection = false, checked = false, checkRecord = () => {},
    } = props;
    const cellList = pattern.map((column) => {
        // @ts-ignore
        const cellData = record[column.key];
        return (
            <Cell
                key={`${record.id}_${column.key}`}
                b={b}
                column={{
                    ...column,
                    customRender: column.customRender || renderColumns[column.key]
                }}
                data={cellData}
            />
        );
    });

    const selectCell = useMemo(() => {
        if (withSelection) {
            const onCheck = (event: ChangeEvent<HTMLInputElement>) => {
                const { target: { checked } } = event;
                checkRecord(checked);
            };
            return (
                <td className={b('cell', { selection: true })}>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onCheck}
                    />
                </td>
            );
        }
    }, [ withSelection, checked, checkRecord ]);

    const extraCell = useMemo(() => {
        if (Extra) {
            return (
                <td className={b('cell', { actions: true })}>
                    <Extra
                        record={record}
                    />
                </td>
            );
        }
    }, [ Extra, record ]);

    return (
        <tr
            className={b('row', { checked }).mix(record.className)}
            onClick={() => checkRecord(!checked)}
        >
            {selectCell}
            {cellList}
            {extraCell}
        </tr>
    );
}
