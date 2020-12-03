import { history } from '../_helpers/history';  



export const addProject = (formdata) =>{
	return(dispatch,getState) =>{
		let headers={
			

		};
		let token = localStorage.getItem('token');
		let id = localStorage.getItem('user_id');
		if(token){
			
			headers['Authorization']=token
			
		}
		

		fetch('https://www.api-intensel.live//api/project/add/'+id+'/',{headers,method:'POST',body:formdata})
			.then(res=>{
				if(res.status < 500){
					
					return res.json().then(data=>{
						return { status:res.status , data};
					})
				}
				else{
					dispatch({type:'PROJECT_FAIL',data:res.data});
					console.log("Server Error");
					throw res.data;
				}
			})
			.then(res =>{
				if(res.status===201){
					dispatch({type:'ADD_PROJECT',project:res.data});
					history.push('/dashboard');
					return res.data;
				}
				else if (res.status ===401 || res.status===403){
					dispatch({type:'AUTHENTICATION_ERROR',data:res.data});
					throw res.data;
				}
				else {
					dispatch({type:'PROJECT_FAIL',data:res.data});
					throw res.data;
				}
			})
			
	}
}
export const getProjects = () =>{
	return(dispatch,getState) =>{
		let headers={}
		
		
		fetch('https://www.api-intensel.live/api/project/',{headers,})
			.then(res=>{
				if(res.status < 500){
					return res.json().then(data=>{
						return { status:res.status , data};
					})
				}
				else{
					dispatch({type:'PROJECT_FAIL',data:res.data});
					console.log("Server Error");
					throw res.data;
				}
			})
			.then(res =>{
				if(res.status===200){
					dispatch({type:'FETCH_PROJECT',project:res.data});
					
					return res.data;
				}
				else if (res.status ===401 || res.status===403){
					dispatch({type:'AUTHENTICATION_ERROR',data:res.data});
					throw res.data;
				}
				else {
					dispatch({type:'PROJECT_FAIL',data:res.data});
					throw res.data;
				}
			})
	}

}

export const getCSV = (formdata) =>{
	return(dispatch,getState) =>{
		let headers={
			

		};
		let token = localStorage.getItem('token');
		let id = localStorage.getItem('user_id');
		if(token){
			
			headers['Authorization']=token
			
		}
		

		fetch('https://www.api-intensel.live//api/portfolio/data/'+id+'/',{headers,method:'POST',body:formdata})
			.then(res=>{
				if(res.status < 500){
					
					return res.json().then(data=>{
						return { status:res.status , data};
					})
				}
				else{
					dispatch({type:'CSV_FAIL',data:res.data});
					console.log("Server Error");
					throw res.data;
				}
			})
			.then(res =>{
				if(res.status===200){
					dispatch({type:'GET_CSV',csv:res.data});
					
					return res.data;
				}
				else if (res.status ===401 || res.status===403){
					dispatch({type:'AUTHENTICATION_ERROR',csv:res.data});
					throw res.data;
				}
				else {
					dispatch({type:'CSV_FAIL',data:res.data});
					throw res.data;
				}
			})
			
	}
}
