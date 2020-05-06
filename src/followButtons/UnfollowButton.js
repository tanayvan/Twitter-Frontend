import React, { Component } from 'react'
import { unFollowAUser } from '../Apicalls'

export default class UnfollowButton extends Component {
    constructor(){
        super()
        this.handleClick=this.handleClick.bind(this)
    }
    handleClick(index,user){
      
       unFollowAUser({unFollowerUsername:user.username})
       .then(data => {
        console.log(data)
       
       })
     .catch(error => console.log(error))


      
    }
    render() {
        return (
            <div>
                <button className="btn btn-sm btn-outline-primary follow-button" onClick={()=>{this.handleClick(this.props.index,this.props.user)}}>
            Following
            </button>
            </div>
        )
    }
}
