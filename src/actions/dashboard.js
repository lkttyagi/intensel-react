export const postDashboard = (formdata) =>{
	return(dispatch,getState) =>{
		let headers={};
		let token = localStorage.getItem('token');
		let id = localStorage.getItem('user_id');
		if(token){
			headers['Authorization']=`Token ${token}`;
		}
		

		fetch('https://intensel.pythonanywhere.com/api/asset/add/'+id+'/',{headers,method:'POST',body:formdata})
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
				if(res.status===201){
					dispatch({type:'ADD_DASHBOARD',locus:res.data});
					
					return res.data;
				}
				else if (res.status ===401 || res.status===403){
					dispatch({type:'AUTHENTICATION_ERROR',data:res.data});
					throw res.data;
				}
				else {
					dispatch({type:'DASHBOARD_FAIL',data:res.data});
					throw res.data;
				}
			})
			
	}
}