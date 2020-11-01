const initialState ={
	location:[],
	errors:{}
};

export default function location(state=initialState,action){
	switch(action.type){
		case 'ADD_LOCATION':
			return {...state,location:action.location};
		case 'FETCH_LOCATION':
			return {...state,location:action.location};
		case 'AUTHENTICATION_ERROR':
		case 'LOCATION_FAIL':
			return {...state,errors:action.data,location:null};
		default:
			return state;
	}
}