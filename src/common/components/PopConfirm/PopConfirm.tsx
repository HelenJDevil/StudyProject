import React, { useRef, FC } from 'react';
import block from 'bem-cn';

import Button, { ButtonSize } from '../Button';
import { PopConfirmProps, PopPosition } from './types';

import './PopConfirm.less';

const b = block('popConfirm');

const PopConfirm: FC<PopConfirmProps> = (props) => {
    const {
        position = PopPosition.bottomLeft, confirmTitle = '', confirmText = 'Да',
        confirmContent = 'Вы уверены, что хотите продолжить?',
        visible = false, onConfirm, onClose,
    } = props;
    const popoverRef = useRef(null);

    // useEffect(() => {
    //     const clickOutsideHandler = ({ target }: MouseEvent) => {
    //         if (target !== popoverRef.current) onClose();
    //     };
    //     document.addEventListener('click', clickOutsideHandler);
    //     return () => {
    //         window.removeEventListener('click', clickOutsideHandler);
    //     };
    // }, []);

    return (
        <div ref={popoverRef} className={b({ visible, position })}>
            {confirmTitle && (<div className={b('title')}>{confirmTitle}</div>)}
            <div className={b('content')}>{confirmContent}</div>
            <div className={b('controlPanel')}>
                <Button size={ButtonSize.small} onClick={onConfirm}>{confirmText}</Button>
                <Button size={ButtonSize.small} onClick={onClose}>Отмена</Button>
            </div>
        </div>
    );
};

export default PopConfirm;
