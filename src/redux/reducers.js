import { combineReducers } from 'redux';
import menu from './menu/reducer';
import auth from '../reducers/auth';
import locus from '../reducers/location';
import company from '../reducers/company';
import project from '../reducers/project';
import feedback from '../reducers/dashboard';

const reducers = combineReducers({
  menu,
  auth,locus,company,project,feedback,
});

export default reducers;
