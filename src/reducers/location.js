const initialState ={
	locus:[],
	errors:{}
};

export default function locus(state=initialState,action){
	switch(action.type){
		case 'ADD_LOCATION':
			return {...state,locus:action.locus};
		case 'FETCH_LOCATION':
			return {...state,locus:action.locus};
		case 'AUTHENTICATION_ERROR':
		case 'LOCATION_FAIL':
			return {...state,errors:action.data,locus:null};
		default:
			return state;
	}
}