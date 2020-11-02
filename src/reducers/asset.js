const initialState ={
	asset:[],
	errors:{}
};

export default function asset(state=initialState,action){
	switch(action.type){
		case 'ADD_ASSET':
			return {...state,asset:action.asset};
		case 'FETCH_ASSET':
			return {...state,location:action.asset};
		case 'AUTHENTICATION_ERROR':
		case 'ASSET_FAIL':
			return {...state,errors:action.data,asset:null};
		default:
			return state;
	}
}