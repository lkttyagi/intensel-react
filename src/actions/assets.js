import { history } from '../_helpers/history';  

export const addAssets = (formdata) =>{
	return(dispatch,getState) =>{
		let headers={};
		let token = localStorage.getItem('token');
		let id = localStorage.getItem('user_id');
		if(token){
			headers['Authorization']=`Token ${token}`;
		}
		console.log('form',formdata);


		fetch('https://intensel.pythonanywhere.com/api/portfolio/add/'+id+'/',{headers,method:'POST',body:formdata})
			.then(res=>{
				if(res.status < 500){
					return res.json().then(data=>{
						return { status:res.status , data};
					})
				}
				else{
					dispatch({type:'ASSET_FAIL',data:res.data});
					console.log("Server Error");
					throw res.data;
				}
			})
			.then(res =>{
				if(res.status===201){
					dispatch({type:'ADD_ASSET',location:res.data});
					history.push('/project')
					return res.data;
				}
				else if (res.status ===401 || res.status===403){
					dispatch({type:'AUTHENTICATION_ERROR',data:res.data});
					throw res.data;
				}
				else {
					dispatch({type:'ASSET_FAIL',data:res.data});
					throw res.data;
				}
			})
			
	}
}
export const getAssets = () =>{
	return(dispatch,getState) =>{
		let headers={}
		
		
		fetch('https://intensel.pythonanywhere.com/api/portfolio/',{headers,})
			.then(res=>{
				if(res.status < 500){
					return res.json().then(data=>{
						return { status:res.status , data};
					})
				}
				else{
					dispatch({type:'ASSET_FAIL',data:res.data});
					console.log("Server Error");
					throw res.data;
				}
			})
			.then(res =>{
				if(res.status===200){
					dispatch({type:'FETCH_ASSET',location:res.data});
					
					return res.data;
				}
				else if (res.status ===401 || res.status===403){
					dispatch({type:'AUTHENTICATION_ERROR',data:res.data});
					throw res.data;
				}
				else {
					dispatch({type:'ASSET_FAIL',data:res.data});
					throw res.data;
				}
			})
	}

}