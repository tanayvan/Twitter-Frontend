import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { singUpCall } from '../Apicalls'

export default class Signup extends Component {
  constructor(){
    super()
    this.state={
      name:"",
      email:"",
      username:"",
      password:"",
      error:"",
      redirect:false
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleClick=this.handleClick.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.name]:event.target.value
    })
  }
  handleClick(event){
    event.preventDefault()
    singUpCall({
      name:this.state.name,
      username:this.state.username,
      email:this.state.email,
      password:this.state.password
    }).then(data => {
      if(data.error){
        console.log(data.error)
        this.setState({
          error:data.error
        })
      }else{
        console.log("Success")
        this.setState({
          redirect:true
        })
      }
    })
  }
  performRedirect(){
    if(this.state.redirect){
      return(
        <Redirect to='/'/>
      )
    }
  }
    render() {
        return (
            <div className="container">
               {this.performRedirect()}
        <div className="row">
          <div className="container-login">
            <div className="welcome-div">
                <h1 className="text-center mt-3">Register Here </h1>
            </div>
            <div className="">
        <p className='text-danger text-center'>{this.state.error}</p>
                <form>
                    
                    <div className="form-group ">
      
                      <input type="text" className="form-control"  aria-describedby="emailHelp" placeholder="Name" required name='name' value={this.state.name} onChange={this.handleChange}/>
                      
                    </div>
                    <div className="form-group ">
      
                      <input type="text" className="form-control"  aria-describedby="emailHelp" placeholder="Username" required name='username' value={this.state.username} onChange={this.handleChange}/>
                      
                    </div>
                    <div className="form-group ">
                      <input type="email" className="form-control"  aria-describedby="emailHelp" placeholder="Email" required name='email' value={this.state.email} onChange={this.handleChange}/>
                     
                    </div>
                    <div className="form-group">

                      <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required name='password' value={this.state.password}  onChange={this.handleChange}/>
                    </div>
                    
                    <button className="btn btn-primary" onClick={this.handleClick}>Sign Up</button>
                    <p className="mt-2">Already Have an account? <Link to="/">Login In Here</Link></p>
                  </form>
              </div>
          </div>
        </div>
            </div>
        )
    }
}
