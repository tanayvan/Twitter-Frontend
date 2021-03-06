//sign in request

import { API, } from "./Backend";

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
            Authorization:`Bearer ${JSON.parse(localStorage.getItem('jwt')).token}`
        },body:JSON.stringify(tweet)
    }).then(response =>{
        return response.json()
    }).catch(error => console.log(error))

}
//Get Users For Discover People
export const getAllUser = ()=>{
    return fetch(`${API}/getalluser`,{
        method:"GET"
    }).then(response =>{
        return response.json()
    }).catch(error => console.log(error))
}

//Follow A User
export const followAUser =(usertoFollow) => {
    console.log(JSON.parse(localStorage.getItem('jwt')).user.username)
    return fetch(`${API}/${JSON.parse(localStorage.getItem('jwt')).user.username}`,{
        method:"PATCH",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${JSON.parse(localStorage.getItem('jwt')).token}`
            },
            body:JSON.stringify(usertoFollow)
    }).then(response => {
        return response.json()
    }).catch(error => console.log(error))
}
//unFollow A user

export const unFollowAUser =(usertoUnFollow) => {
    console.log(JSON.parse(localStorage.getItem('jwt')).user.username)
    return fetch(`${API}/unfollowing/${JSON.parse(localStorage.getItem('jwt')).user.username}`,{
        method:"PATCH",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${JSON.parse(localStorage.getItem('jwt')).token}`
            },
            body:JSON.stringify(usertoUnFollow)
    }).then(response => {
        return response.json()
    }).catch(error => console.log(error))
}

//Add User in Followers Tab
export const GetFollowedByUser =(userWhoIsFollowed) => {
    console.log(JSON.parse(localStorage.getItem('jwt')).user.username)
    return fetch(`${API}/follower/${userWhoIsFollowed}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${JSON.parse(localStorage.getItem('jwt')).token}`
            },
            body:JSON.stringify({
                followerUsername:JSON.parse(localStorage.getItem('jwt')).user.username
            })
    }).then(response => {
        return response.json()
    }).catch(error => console.log(error))
}

//remove User in Followers Tab
export const GetUnFollowedByUser =(userWhoIsUnFollowed) => {
    console.log(JSON.parse(localStorage.getItem('jwt')).user.username)
    return fetch(`${API}/unfollower/${userWhoIsUnFollowed}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${JSON.parse(localStorage.getItem('jwt')).token}`
            },
            body:JSON.stringify({
                unFollowerUsername:JSON.parse(localStorage.getItem('jwt')).user.username
            })
    }).then(response => {
        return response.json()
    }).catch(error => console.log(error))
}

//Get Tweets  For Feeds

export const getTweetsForFeed = (username) => {
    return fetch(`${API}/feed/${username}`,{
        method:"GET"
    }).then(response =>{
        return response.json()
    }).catch(error => console.log(error)) 
}