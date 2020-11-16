const initialState ={
	project:[],
	errors:{}
};

export default function project(state=initialState,action){
	switch(action.type){
		case 'ADD_LOCATION':
			return {...state,project:action.project};
		case 'FETCH_LOCATION':
			return {...state,project:action.project};
		case 'AUTHENTICATION_ERROR':
		case 'LOCATION_FAIL':
			return {...state,errors:action.data,project:null};
		default:
			return state;
	}
}