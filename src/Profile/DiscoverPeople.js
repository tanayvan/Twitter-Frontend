import React, { Component } from 'react'
import { getAllUser, followAUser } from '../Apicalls'


export default class DiscoverPeople extends Component {

  constructor(){
    super()
    this.state={
      users:[],
      isFollowing:false
    }
    this.handleClick=this.handleClick.bind(this)
  }
  componentDidMount(){
    this.loadAllUserInfo()
  }
  
  loadAllUserInfo(){
    getAllUser().then(data =>{
      this.setState({
        users:data
      })
      console.log(this.state.users)
    }).catch(error => console.log(error))
  }
    handleClick(index,user){
        console.log(user.username)
        followAUser({followerUsername:user.username})
         .then(data => console.log(data))
        .catch(error => console.log(error))
    }
    render() {
        return (
         
            <div className="col-lg-3 mt-5">
              
          <h3>Discover People</h3>
          {this.state.users.map((user,index)=> {
              if(user.username!==JSON.parse(localStorage.getItem('jwt')).user.username){
                return(
                  <div className="card mt-5" key={index} >
            <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">@{user.username}</h6>
              <button className="btn btn-sm btn-outline-primary" onClick={()=>{this.handleClick(index,user)}}>Follow</button>
            </div>
          </div>
                )
              }
          })}
          
         
        </div>
        )
    }
}
