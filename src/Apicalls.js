//sign in request

import { API, token } from "./Backend";

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

//Get Specific User Tweets

export const getUserTweet = (username) => {
   
    return fetch(`${API}/tweets/${username}`,{
        method:"GET"
    }).then(response => {
        return response.json()
    }).catch(error => {
        console.log(error)
    })
}

//Post A Tweet
export const insertTweet = (tweet,user) => {
    return fetch(`${API}/${user}`,{
        method:"POST",
        headers:{   
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token.token}`
        },body:JSON.stringify(tweet)
    }).then(response =>{
        return response.json()
    }).catch(error => console.log(error))

}