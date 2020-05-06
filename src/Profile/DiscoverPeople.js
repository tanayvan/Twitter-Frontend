import React, { Component } from 'react'
import { getAllUser, followAUser } from '../Apicalls'


export default class DiscoverPeople extends Component {

  constructor(props){
    super(props)
    this.state={
      users:[],
      data:[]
      
    }
    this.handleClick=this.handleClick.bind(this)
    this.loadAllUserInfo=this.loadAllUserInfo.bind(this)
    
  }
 componentWillMount(){
   this.loadAllUserInfo()
   
 }
 componentDidUpdate(prevProps, prevState){
  if (prevState.data !== this.state.data) {
    this.loadAllUserInfo()
    this.setState({
      reload:false
    })
  }
 }
 
  

  loadAllUserInfo(){
   
    
    getAllUser().then(data =>{
      this.setState({
        users:data
      })
     
    }).catch(error => console.log(error))
  }
    handleClick(index,user){
      
        followAUser({followerUsername:user.username}
          )
         .then(data => {
           console.log(data)
          
          })
        .catch(error => console.log(error))
       


      
    }
    render(props) {
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
              <button className="btn btn-sm btn-outline-primary follow-button" onClick={()=>{this.handleClick(index,user)}}>
                {(this.props.data.includes(user.username)?"Following":"Follow")
                }</button>
            </div>
          </div>
                )
              }
          })}
          
         
        </div>
        )
    }
}
