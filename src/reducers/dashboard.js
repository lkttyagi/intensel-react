const initialState ={
	feedback:[],
	errors:{},
	building:[],
	detail:[],
	detailyear:[],
};

export default function feedback(state=initialState,action){
	switch(action.type){
		case 'ADD_DASHBOARD':
			return {...state,feedback:action.feedback};
		case 'GET_BUILDING':
			return {...state,building:action.building};
		case 'GET_DETAIL':
			return {...state,detail:action.detail}
		case 'GET_DETAIL_YEAR':
			return {...state,detailyear:action.detailyear}	
		case 'AUTHENTICATION_ERROR':
		case 'DASHBOARD_FAIL':
			return {...state,errors:action.data,feedback:null};
		case 'BUILDING_FAIL':
			return {...state,errors:action.data,building:null};
		case 'DETAIL_FAIL':
			return {...state,errors:action.data,detail:null};
		case 'DETAIL_YEAR_FAIL':
			return {...state,errors:action.data,detailyear:null}
		default:
			return state;
	}
}