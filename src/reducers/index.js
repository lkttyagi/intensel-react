import auth from './auth';
import location from './location';
import asset  from './asset';
import company from './company';
import projecct from './project';
import feedback from './dashboard';


const dashboard = combineReducers({
	auth,location,asset,company,feedback,project
})
export default dashboard;