import React, { Component } from 'react'
import { getUser, getUserTweet } from '../Apicalls'
import Navbar from './Navbar'

export default class  Profile extends Component {
    constructor(){
        super()
        this.state={
            data:"",
            tweetsData:[],
            loading:true,
        }
    }
  componentDidMount(){
    
    this.getTweetsOfUser()
    this.getUserinfo()
    this.setState({
      loading:false
    })
  }
    getUserinfo(){
        const username=this.props.match.params.username
        getUser(username).then(data => {
            if(data.error){
                console.log(data.error)
            }
            else{

                this.setState({
                    data:data,
                    
                })  
                
                
        }
          
        }).catch(error =>console.log(error))
    }
    
    getTweetsOfUser(){
      const username=this.props.match.params.username
      
      getUserTweet(username).then(data => {
            if(data.error){
              console.log(data.error)
            }
            else{
              this.setState({
                tweetsData:data.tweets
              })
              
            }

        
      }).catch(error => console.log(error))
    }
    
    
    componentDidUpdate(prevProps, prevState){
      if (prevState.data !== this.state.data) {
        this.getTweetsOfUser()
    this.getUserinfo()
    this.setState({
      loading:false
    })
      }
    }
    render() {
      
      if(this.state.loading){
        return(
          <h1>Loading</h1>
        )
      }
        else{
        return (
            <div className="container">
             
      
      <div className="row">
        <Navbar />
        <div className="col-lg-6 mt-5 feed-body">
          <p className="twitter-title">Profile</p>
          

          <div className="card mt-5" >
            <img className='profile-picture'src="https://images.unsplash.com/photo-1587578016785-bea53a782ea8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
            <div className="card-body">
              <h5 className="card-title">{this.state.data.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">@{this.state.data.username}</h6>
              <p className="mt-5">Do people even read this</p>
            </div>
          </div>
          <h1 className="my-3 text-center">Your Tweets</h1>
         
            {this.state.tweetsData.map((tweet,index) => {
              return(
                <div className="card mt-4" >
            <div className="card-body">
              <h5 className="card-title">{this.state.data.name}</h5>
              <h6 className="card-subtitle mb-4 text-muted">@{this.state.data.username}</h6>
              <p className="card-text">{tweet.tweet}</p>
            </div>
          </div>
              )
            })}
            
        
          
         
          
        </div>
        <div className="col-lg-3 mt-5">
          <h3>Discover People</h3>
        
          <div className="card mt-5" >
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <button className="btn btn-sm btn-outline-primary">Follow</button>
            </div>
          </div>
         
        </div>
      </div>
    </div>
        )
    }
}
    }
