import React, { FC } from 'react';
import Modal from 'react-modal';
import { block } from 'bem-cn';

import { ModalProps } from './types';

import './Modal.less';

const modalStyles: Modal.Styles = {
    overlay: {
        backgroundColor: 'rgba(19,19,19,0.75)',
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        outline: 'none',

        backgroundColor: '#EEEEEE',
        border: 'none',
        width: '31.85rem',
        overflow: 'hidden',
        padding: '0px',
        paddingBottom: '1rem',
        maxHeight: '80%',
    },
};

const b = block('modal');

const PresetModal: FC<ModalProps> = (props) => {
    const { title, visibility, onClose, children } = props;
    return (
        <Modal
            className={b()}
            isOpen={visibility}
            contentLabel={title}
            style={modalStyles}
            onRequestClose={onClose}

        >
            {title && (<div className={b('header').mix('commonHeader')}>{title}</div>)}
            <div className={b('body')}>
                {children}
            </div>
        </Modal>
    );
};

export default PresetModal;
