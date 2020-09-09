import { ElementType, ReactNode } from 'react';
import { Block } from 'bem-cn';
import { ColumnProps, ColumnStructure, DataSource, Record, RowOptions, TableSelection } from '../../types';

export interface SelectionParams extends TableSelection{
    setSelection: (newSelection: TableSelection) => void,
}

export interface TableProps {
    dataSource: DataSource<Record & RowOptions>,
    className?: string,
    pattern: ColumnStructure,
    renderColumns?: { [key: string]: (value?: any, record?: Record) => ReactNode },
    loading?: boolean,
    withSelection?: boolean,
    selectionParams?: SelectionParams,
    RowExtra?: ElementType<{ record: Record }>,
}
export interface RowProps {
    b: Block,
    pattern: ColumnStructure,
    renderColumns?: { [key: string]: (value?: any, record?: Record) => ReactNode },
    record: Record & RowOptions,
    Extra?: ElementType<{ record: Record }>,
    withSelection?: boolean,
    checked?: boolean,
    checkRecord?: (value: boolean) => void,
}

export interface CellProps {
    b: Block,
    column: ColumnProps,
    data?: any,
}
