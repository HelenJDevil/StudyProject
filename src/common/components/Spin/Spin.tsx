import React, { FC, CSSProperties, ReactNode } from 'react';
import block from 'bem-cn';

import './Spin.less';

interface IProps {
    fontSize?: string,
    spinning?: boolean,
    icon?: ReactNode,
    wrapperStyle?: CSSProperties,
}

const b = block('spinner');

const Spin: FC<IProps> = (props) => {
    const { fontSize, spinning = false, icon, wrapperStyle = {}, children } = props;

    const ballStyle = fontSize ? { fontSize } : {};

    const viewIcon = icon && !spinning ? icon : (
        <i
            className={b('ball', { on: spinning }).mix('material-icons')}
            style={ballStyle}
        >
            donut_large
        </i>
    );
    return (
        <div
            className={b({ type: children ? 'box' : 'line', on: spinning })}
            style={wrapperStyle}
        >
            {children}
            {viewIcon}
            <div className={b('screen', { on: children && spinning })} />
        </div>
    );
};

export default Spin;
