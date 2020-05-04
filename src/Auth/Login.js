import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { signInCall } from '../Apicalls'


export default class Login extends Component {
    constructor(){
        super()
            this.state={
            email:"tanayvan@gmail.com",
            password:"tanayvan",
            error:"",
            redirect:false,
            data:""
        }
        this.handleClick=this.handleClick.bind(this)
        this.handleChange=this.handleChange.bind(this)
      }
      handleChange = (event) => {
            this.setState({
              [event.target.name]:event.target.value
            })
      }
      handleClick(event){
        event.preventDefault()
        signInCall({
          email:this.state.email,
          password:this.state.password
        }).then((data) => {
          if(data.error){
            console.log(data.error)
            this.setState({
              error:data.error
            })
          }else{
            console.log(data)
            this.setState({
              data:data,
              redirect:true
            })
        
            
          }
        }).catch(error => {
          console.log(error)
        })
    
      }
      performRedirect(){
        if(this.state.redirect){
          return(
            <Redirect to={`/${this.state.data.user.username}`}/>
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
                        <h1 className="text-center mt-3">Welcome </h1>
                     </div>
                    <div className="">
                       
                    <form>
                        <div className="form-group ">
                        <p className='text-center text-danger'>{this.state.error}</p>
                          <input onChange={this.handleChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email Here" name='email' value={this.state.email}/>
                          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                         
                          <input onChange={this.handleChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' value={this.state.password}/>
                        </div>
                        
                        <button className="btn btn-primary" onClick={this.handleClick}>Login</button>
                        <p className="mt-2">Don't Have an account? <Link to="/signup">Sign Up Here</Link></p>
                      </form>
                  </div>
              </div>
            </div>
            
        </div>
            
        )
    }
}
