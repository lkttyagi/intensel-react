const initialState ={
	project:[],
	errors:{},
	csv:[],
};

export default function project(state=initialState,action){
	switch(action.type){
		case 'ADD_PROJECT':
			return {...state,project:action.project};
			
		case 'FETCH_PROJECT':
			return {...state,project:action.project};
		case 'AUTHENTICATION_ERROR':
		case 'PROJECT_FAIL':
			return {...state,errors:action.data,project:null};
		case 'GET_CSV':
			return {...state,csv:action.csv};
		case 'CSV_FAIL':
			return {...state,errors:action.data,csv:null};

		default:
			return state;
	}
}