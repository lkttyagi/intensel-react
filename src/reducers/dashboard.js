const initialState ={
	feedback:[],
	errors:{}
};

export default function feedback(state=initialState,action){
	switch(action.type){
		case 'ADD_DASHBOARD':
			return {...state,feedback:action.feedback};
		
		case 'AUTHENTICATION_ERROR':
		case 'DASHBOARD_FAIL':
			return {...state,errors:action.data,feedback:null};
		default:
			return state;
	}
}