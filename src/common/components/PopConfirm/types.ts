import { ReactNode } from 'react';

export enum PopPosition {
    bottomRight = 'bottom-right',
    bottomLeft = 'bottom-left',
    topRight = 'top-right',
    topLeft = 'top-left',
}

export interface PopConfirmProps {
    position?: PopPosition,
    confirmTitle?: string,
    confirmContent?: ReactNode,
    confirmText?: string,
    visible?: boolean,
    onConfirm: () => void,
    onClose: () => void,
}
