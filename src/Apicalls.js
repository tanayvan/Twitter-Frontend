//sign in request

import { API } from "./Backend";

export const signInCall = (userInfo)=>{
    return fetch(`${API}/signin`,({
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },body:JSON.stringify(userInfo)
    })).then(response => {
        return response.json()
    }).catch(error => console.log(error))
}

export const singUpCall = (userInfo) => {
    return fetch(`${API}/signup`,({
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },body:JSON.stringify(userInfo)
    })).then(response => {
        return response.json()
    }).catch(error => console.log(error))
}