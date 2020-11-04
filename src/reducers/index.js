import auth from './auth';
import location from './location';
import asset  from './asset';
import company from './company';

const dashboard = combineReducers({
	auth,location,asset,company
})
export default dashboard;