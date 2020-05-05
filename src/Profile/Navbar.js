import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { token } from '../Backend'
import { signOutAUser } from '../Apicalls'

export default class Navbar extends Component {
  constructor(){
    super()
    this.state={
      redirect:false
    }
    this.handleClick=this.handleClick.bind(this)
  }
  handleClick(){
    signOutAUser(() => {
      console.log("Signout Sucessful")
      this.setState({
        redirect:true
      })

    })
  }
    render() {
        if(this.state.redirect){
          return(
            <Redirect to='/'></Redirect>
          )
        }
        return (
            <div className="col-lg-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link active" to='/home'>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/${token.user.username}`}>Profile</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" >Explore</Link>
            </li>
           <li className='nav-item mt-2'>
             <button className='nav-link btn btn-outline-danger' onClick={this.handleClick}>Sign Out</button>
           </li>
          </ul>
        </div>
        )
    }
}
