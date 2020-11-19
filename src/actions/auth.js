import { history } from '../_helpers/history';  


export const loadUser = () => {
  return (dispatch, getState) => {
    dispatch({type:"USER_LOADING"});
    
    const token = getState().auth.token;

    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    return fetch("accounts/user/", {headers, })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: 'USER_LOADED', user: res.data });
          console.log(res.data);
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}
export const login = (formdata) => {
  return (dispatch, getState) => {
    let headers = {};
    

    return fetch("https://www.api-intensel.live/api/user/login/", {headers, body:formdata, method: "POST"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 201) {
          dispatch({type: 'LOGIN_SUCCESSFUL', data: res.data });
          

          localStorage.setItem('user_id',res.data.user['id'])
          history.push('/location');
          return res.data;
          
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          
        

          throw res.data;
        } else {
          dispatch({type: "LOGIN_FAILED", data: res.data});
          

          throw res.data;
        }
      })
  }
}
export const register = (first_name,last_name,username,email, password ,confirm_password ,company_code) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({first_name,last_name,username,email, password, confirm_password ,company_code,});

    return fetch("http://www.api-intensel.live/api/user/", {headers, body, method: "POST"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          dispatch({type: 'REGISTRATION_SUCCESSFUL', data: res.data });
          history.push('/login');
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        } else {
          dispatch({type: "REGISTRATION_FAILED", data: res.data});
          throw res.data;
        }
      })
  }
}

export const isUserAuthenticated =() =>{
  return (localStorage.getItem('token')!==null && localStorage.getItem('token')!==undefined)
}

export const logout =()=>{
  return(dispatch,getState)=>{
    let headers={};
    let id = localStorage.getItem('user_id');

    return fetch("https://www.api-intensel.live/api/user/logout/"+id,{headers,method:'GET'})
      .then(res =>{
        if(res.status<500){
          return res.json().then(data =>{
            return {status:res.status,data};
          })
        }
          else{
            console.log("Server Error!");
            throw res;
          }
        
      })
      .then(res =>{
        if(res.status === 200 || res.status ===201){
          dispatch({type:'LOGOUT_SUCCESSFUL',data:res.data});
          
          history.push('/login');
          return res.data;
        }
        else if(res.status === 403 || res.status === 401){
          dispatch({type:'AUTHENTICATION_ERROR',data:res.data});
          throw res.data;
        }
        else{
          dispatch({type:'LOGOUT_FAILED',data:res.data});
          throw res.data;
        }
      })

  }
}