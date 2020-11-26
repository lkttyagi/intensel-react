import { createStore,combineReducers,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import auth from '../reducers/auth';
import locus from '../reducers/location';
import company from '../reducers/company';
import project from '../reducers/project';
import feedback from '../reducers/dashboard';

let reducers =  combineReducers({
	auth,locus,company,project,feedback
});

const store = createStore(
  reducers,
  applyMiddleware(thunkMiddleware)
	);

export default store;
