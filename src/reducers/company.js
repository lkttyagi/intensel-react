const initialState ={
	company:[],
	errors:{}
};

export default function company(state=initialState,action){
	switch(action.type){
	
		case 'FETCH_COMPANY':
			return {...state,company:action.company};
		case 'AUTHENTICATION_ERROR':
		case 'COMPANY_FAIL':
			return {...state,errors:action.data,company:null};
		default:
			return state;
	}
}