export const getCompanies = () =>{
	return(dispatch,getState) =>{
		let headers={}
		
		
		fetch('https://company-mined-data.s3.ap-south-1.amazonaws.com/company_data.json',{headers,})
			.then(res=>{
				if(res.status < 500){
					return res.json().then(data=>{
						return { status:res.status , data};
					})
				}
				else{
					dispatch({type:'COMPANY_FAIL',data:res.data});
					console.log("Server Error");
					throw res.data;
				}
			})
			.then(res =>{
				if(res.status===200){
					dispatch({type:'FETCH_COMPANY',company:res.data});
					
					return res.data;
				}
				else if (res.status ===401 || res.status===403){
					dispatch({type:'AUTHENTICATION_ERROR',data:res.data});
					throw res.data;
				}
				else {
					dispatch({type:'COMPANY_FAIL',data:res.data});
					throw res.data;
				}
			})
	}

}