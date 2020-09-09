import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// import persistState from 'redux-localstorage';

import rootReducer from 'store/reducer';

export default function configureStore(extra: any) {
    const middlewares = [ thunk.withExtraArgument(extra) ];
  
    const reducer = combineReducers({
        App: rootReducer,
    });
  
    const store = createStore(
        reducer,
        composeWithDevTools(
            applyMiddleware(...middlewares),
            // persistState([ ])
        ),
    );

    return store;
}
