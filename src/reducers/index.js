import auth from './auth';
import location from './location';

const dashboard = combineReducers({
	auth,location
})
export default dashboard;