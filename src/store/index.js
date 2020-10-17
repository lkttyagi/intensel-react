import { createStore,combineReducers,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import auth from '../reducers/auth';
import location from '../reducers/location';

let reducers =  combineReducers({
	auth,location
});

const store = createStore(
  reducers,
  applyMiddleware(thunkMiddleware)
	);

export default store;
