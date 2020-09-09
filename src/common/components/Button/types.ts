import { ReactNode } from 'react';
import { PopPosition } from '../PopConfirm';

export enum ButtonTemplate {
    dangerous = 'dangerous',
    primary = 'primary',
    main = 'main',
}

export enum ButtonSize {
    box = 'box',
    small = 'small',
    middle = 'middle',
    big = 'big',
    adaptive = 'adaptive'
}

export interface ButtonProps {
    type?: 'submit' | 'reset' | 'button',
    template?: ButtonTemplate,
    size?: ButtonSize,
    className?: string,
    onClick?: () => void,
    disabled?: boolean,
    loading?: boolean,
    styles?: object,
    icon?: ReactNode,
    title?: string,
    needsConfirmation?: boolean,
    confirmPosition?: PopPosition,
    confirmContent?: ReactNode,
    confirmText?: string,
}
