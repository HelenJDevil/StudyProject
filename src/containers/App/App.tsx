import React from 'react';
import { block } from 'bem-cn';

import UserTable from 'features/UserTable';

import './App.less';

const b = block('app');

export default function App() {
    return (
        <div className={b()}>
            <UserTable />
        </div>
    );
}
