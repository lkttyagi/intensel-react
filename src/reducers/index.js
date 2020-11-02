import auth from './auth';
import location from './location';
import asset  from './asset';

const dashboard = combineReducers({
	auth,location,asset
})
export default dashboard;