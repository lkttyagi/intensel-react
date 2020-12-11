export const postDashboard = (formdata) =>{
	return(dispatch,getState) =>{
		let headers={};
		let token = localStorage.getItem('token');
		let id = localStorage.getItem('user_id');
		if(token){
			headers['Authorization']=`${token}`;
		}
		

		fetch('https://www.api-intensel.live/api/dashboard/overall/'+id+'/',{headers,method:'POST',body:formdata})
			.then(res=>{
				if(res.status < 500){
					return res.json().then(data=>{
						return { status:res.status , data};
					})
				}
				else{
					dispatch({type:'DASHBOARD_FAIL',data:res.data});
					console.log("Server Error");
					throw res.data;
				}
			})
			.then(res =>{
				if(res.status===200){
					console.log("respskso",res.data)
					dispatch({type:'ADD_DASHBOARD',feedback:res.data});
					
					return res.data;
				}
				else if (res.status ===401 || res.status===403){
					dispatch({type:'AUTHENTICATION_ERROR',feedback:res.data});
					throw res.data;
				}
				else {
					dispatch({type:'DASHBOARD_FAIL',feedback:res.data});
					throw res.data;
				}
			})
			
	}
}

export const getBuilding = (formdata) =>{
	return(dispatch,getState) =>{
		let headers={};
		let token = localStorage.getItem('token');
		let id = localStorage.getItem('user_id');
		if(token){
			headers['Authorization']=`${token}`;
		}
		

		fetch('https://www.api-intensel.live/api/building/'+id+'/',{headers,method:'POST',body:formdata})
			.then(res=>{
				if(res.status < 500){
					return res.json().then(data=>{
						return { status:res.status , data};
					})
				}
				else{
					dispatch({type:'BUILDING_FAIL',data:res.data});
					console.log("Server Error");
					throw res.data;
				}
			})
			.then(res =>{
				if(res.status===200){
					console.log("respskso",res.data)
					dispatch({type:'GET_BUILDING',building:res.data});
					
					return res.data;
				}
				else if (res.status ===401 || res.status===403){
					dispatch({type:'AUTHENTICATION_ERROR',building:res.data});
					throw res.data;
				}
				else {
					dispatch({type:'BUILDING_FAIL',building:res.data});
					throw res.data;
				}
			})
			
	}
}
export const getDetail = (formdata) =>{
	return(dispatch,getState) =>{
		let headers={};
		let token = localStorage.getItem('token');
		let id = localStorage.getItem('user_id');
		if(token){
			headers['Authorization']=`${token}`;
		}
		

		fetch('https://www.api-intensel.live/api/dashboard/detailed/'+id+'/',{headers,method:'POST',body:formdata})
			.then(res=>{
				if(res.status < 500){
					return res.json().then(data=>{
						return { status:res.status , data};
					})
				}
				else{
					dispatch({type:'DETAIL_FAIL',data:res.data});
					console.log("Server Error");
					throw res.data;
				}
			})
			.then(res =>{
				if(res.status===200){
					console.log("respskso",res.data)
					dispatch({type:'GET_DETAIL',detail:res.data});
					
					return res.data;
				}
				else if (res.status ===401 || res.status===403){
					dispatch({type:'AUTHENTICATION_ERROR',detail:res.data});
					throw res.data;
				}
				else {
					dispatch({type:'DETAIL_FAIL',detail:res.data});
					throw res.data;
				}
			})
			
	}
}

export const getDetailByYear =(formdata) =>{

	return(dispatch,getState) =>{
		let headers={};
		let token = localStorage.getItem('token');
		let id = localStorage.getItem('user_id');
		if(token){
			headers['Authorization']=`${token}`;
		}
		

		fetch('https://www.api-intensel.live/api/portfolio/allyear/'+id+'/',{headers,method:'POST',body:formdata})
			.then(res=>{
				if(res.status < 500){
					return res.json().then(data=>{
						return { status:res.status , data};
					})
				}
				else{
					dispatch({type:'DETAIL__YEAR_FAIL',data:res.data});
					console.log("Server Error");
					throw res.data;
				}
			})
			.then(res =>{
				if(res.status===200){
					console.log("respskso",res.data)
					dispatch({type:'GET_DETAIL_YEAR',detailyear:res.data});
					
					return res.data;
				}
				else if (res.status ===401 || res.status===403){
					dispatch({type:'AUTHENTICATION_ERROR',detailyear:res.data});
					throw res.data;
				}
				else {
					dispatch({type:'DETAIL_YEAR_FAIL',detailyear:res.data});
					throw res.data;
				}
			})
			
	}

}



