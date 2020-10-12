import { createStore,combineReducers,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import auth from '../reducers/auth';

let reducers =  combineReducers({
	auth
});

const store = createStore(
  reducers,
  applyMiddleware(thunkMiddleware)
	);

export default store;
