import React, { useEffect, useMemo, useState, ChangeEvent, ReactNodeArray } from 'react';
import { block } from 'bem-cn';

import { DataSource } from 'common/types';
import { TWithPagination } from './types';

import './withPagination.less';

const b = block('paginatedComponent');

const withPagination: TWithPagination = WrappedComponent => (props) => {
    const { defaultPageSize = 10, pageSizeList = [ 5, 10, 15, 25, 50 ], children, ...childrenProps } = props;
    const { dataSource } = childrenProps;
    const [ pageSize, setPageSize ] = useState<number>(defaultPageSize);
    const [ pageNumber, setPageNumber ] = useState<number>(0);
    const pageCount = Math.ceil(dataSource.length / pageSize) || 1;

    const visibleData: DataSource = useMemo(() => {
        const startIndex = pageNumber * pageSize;
        const endIndex = startIndex + pageSize;
        return dataSource.slice(startIndex, endIndex);
    }, [ dataSource, pageNumber, pageSize ]);

    const pageSizeOptions: ReactNodeArray = useMemo(() => pageSizeList.map(size => (
        <option key={size} value={size}>{size}</option>
    )), [ pageNumber, pageCount ]);

    const onChangeSize = (event: ChangeEvent<HTMLSelectElement>) => {
        const { target: { value } } = event;
        setPageSize(Number(value));
    };

    const pageNavList = useMemo(() => {
        let pageOptions: ReactNodeArray = [];
        for (let i = 0; i < pageCount; i++) {
            pageOptions = [ ...pageOptions, (
                <option key={i} value={i}>{i + 1}</option>
            ) ];
        }
        return pageOptions;
    }, [ pageCount ]);

    const onChangeNumber = (event: ChangeEvent<HTMLSelectElement>) => {
        const { target: { value } } = event;
        setPageNumber(Number(value));
    };

    useEffect(() => {
        setPageNumber(0);
        return () => {};
    }, [ dataSource, pageSize ]);

    // @ts-ignore | считает,что WrappedComponent не имеет конструктова или сигнатуры вызова
    const child = <WrappedComponent {...childrenProps} dataSource={visibleData} />;
    return (
        <div className={b()}>
            <div className={b('controlPanel')}>
                <div className={b('childControls')}>
                    {children}
                </div>
                <div className={b('pagination')}>
                    <label htmlFor="pageNumber">Страница: </label>
                    <select id="pageNumber" value={pageNumber} onChange={onChangeNumber}>{pageNavList}</select>
                    <label htmlFor="pageSize">по </label>
                    <select id="pageSize" value={pageSize} onChange={onChangeSize}>{pageSizeOptions}</select>
                </div>
            </div>
            {child}
        </div>
    );
};

export default withPagination;
