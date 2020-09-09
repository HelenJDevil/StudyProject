import React, { useState, FC, useMemo } from 'react';
import block from 'bem-cn';

import PopConfirm from '../PopConfirm';
import Spin from '../Spin';

import { ButtonProps, ButtonTemplate, ButtonSize } from './types';

import './Button.less';

const b = block('button');

const Button: FC<ButtonProps> = (props) => {
    const {
        title, type = 'button', template = ButtonTemplate.primary, size = ButtonSize.middle,
        className = '', onClick, disabled = false, loading = false, styles = {},
        needsConfirmation = false, confirmPosition, confirmContent, confirmText,
        icon, children,
    } = props;

    const [ popVisible, setPopVisibility ] = useState<boolean>(false);

    const popBlock = useMemo(() => {
        if (needsConfirmation) {
            const closePop = () => setPopVisibility(false);
            const onConfirm = () => {
                if (onClick) onClick();
                closePop();
            };
            return (
                <PopConfirm
                    confirmTitle={title}
                    visible={popVisible}
                    onConfirm={onConfirm}
                    onClose={closePop}
                    confirmContent={confirmContent}
                    confirmText={confirmText}
                    position={confirmPosition}
                />
            );
        }
    }, [ title, confirmContent, confirmText, confirmPosition, popVisible, onClick ]);

    const onBtnClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (needsConfirmation) {
            setPopVisibility(true);
        } else if (onClick) onClick();
    };
    return (
        <button
            title={title}
            type={type}
            className={b({ template, disabled, size, icon: Boolean(icon) }).mix(className)}
            onClick={onBtnClick}
            style={styles}
            disabled={disabled}
        >
            {children}
            <Spin spinning={loading} icon={icon} />
            {popBlock}
        </button>
    );
};

export default Button;
