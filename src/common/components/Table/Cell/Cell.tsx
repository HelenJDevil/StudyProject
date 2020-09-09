import React from 'react';

import { CellProps } from '../types';

export default function Cell<T = any>(props: CellProps) {
    const { b, data, column: { className, getText, customRender } } = props;
    const dataString = getText ? getText(data) : data;
    return (
        <td className={b('cell').mix(className)}>
            {customRender ? customRender(data) : dataString}
        </td>
    );
}
