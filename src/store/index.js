import { createStore,combineReducers,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import auth from '../reducers/auth';
import location from '../reducers/location';
import company from '../reducers/company';

let reducers =  combineReducers({
	auth,location,company
});

const store = createStore(
  reducers,
  applyMiddleware(thunkMiddleware)
	);

export default store;
