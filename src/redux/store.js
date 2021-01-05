import reducers from './reducers';

import { createStore,combineReducers,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

export function configureStore(initialState) {

    const store = createStore(
        reducers,
        initialState,
        applyMiddleware(thunkMiddleware)
    );

    // sagaMiddleware.run(sagas);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
