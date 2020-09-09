import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import * as serviceWorker from 'serviceWorker';

import { App } from 'containers';

import { Api } from 'middlewares/api';
import configureStore from 'configureStore';

import 'common/styles/root.less';

function getAppURL(): string {
    const appName = window.location.pathname.split('/')[1];
    return appName ? `/${appName}` : '';
}

export const store = configureStore({ api: new Api(getAppURL()) });

export type AppDispatch = typeof store.dispatch;

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.querySelector('#root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
