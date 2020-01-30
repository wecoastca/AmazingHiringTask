import { createStore, combineReducers } from 'redux';

import table from '../reducers/table';

const rootReducer = combineReducers({ table });

const store = createStore(
    rootReducer,
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;