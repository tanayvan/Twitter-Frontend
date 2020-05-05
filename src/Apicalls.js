//sign in request

import { API } from "./Backend";

//sign in call to backend
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

//Sign Up call to backend
export const signUpCall = (userInfo) => {
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

//For Storing Token in Local Storage
export const authenticate = (data,next) => {
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt",JSON.stringify(data))
        next()
    }
}

//For Loading Profile Information
export const getUser = (user) => {
    return fetch(`${API}/${user}`,{
        method:"GET"
    }).then(response => {
        return response.json()
    }).catch((error => console.log(error)))
}

//SignOut A User

export const signOutAUser=(next) => {
    if(typeof window!==undefined){
        localStorage.removeItem("jwt")
        next()
        return fetch(`${API}/signout`,{
            method:"GET"
        }).then(response =>console.log(response))
           .catch(error => console.log(error))
    }
}