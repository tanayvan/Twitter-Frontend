import React, { Component } from 'react'
import { followAUser } from '../Apicalls'

export default class FollowButton extends Component {
    constructor(){
        super()
        this.handleClick=this.handleClick.bind(this)
    }
    handleClick(index,user){
      
        followAUser({followerUsername:user.username}
          )
         .then(data => {
           console.log(data)
          
          })
        .catch(error => console.log(error))
       


      
    }
    render() {
        return (
        <div>
        <button className="btn btn-sm btn-outline-primary follow-button" onClick={()=>{this.handleClick(this.props.index,this.props.user)}}>
            Follow
            </button>
            </div>
        )
    }
}
