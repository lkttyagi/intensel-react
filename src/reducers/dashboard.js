const initialState ={
	feedback:[],
	errors:{}
};

export default function feedback(state=initialState,action){
	switch(action.type){
		case 'ADD_DASHBOARD':
			return {...state,dashboard:action.dashboard};
		
		case 'AUTHENTICATION_ERROR':
		case 'DASHBOARD_FAIL':
			return {...state,errors:action.data,dashboard:null};
		default:
			return state;
	}
}