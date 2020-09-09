import React, { ElementType } from 'react';
import { DataViewer } from 'common/types';

export interface PaginationProps extends DataViewer {
    defaultPageSize?: number,
    pageSizeList?: Array<number>,
}

export type TWithPagination = <ChildProps extends DataViewer = DataViewer>(WrappedComponent: ElementType<ChildProps>) => React.FC<ChildProps & PaginationProps>;
