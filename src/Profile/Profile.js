import React, { Component } from 'react'
import { getUser, getUserTweet } from '../Apicalls'
import Navbar from './Navbar'
import DiscoverPeople from './DiscoverPeople'
import FollowButton from '../followButtons/FollowButton'
import UnfollowButton from '../followButtons/UnfollowButton'


export default class  Profile extends Component {
    constructor(){
        super()
        this.state={
            data:"",
            tweetsData:[],
            loading:true,
            userData:[]
        }
    }
  componentDidMount(){
    this.setState({
      loading:true
    })
    this.getTweetsOfUser()
    this.getUserinfo()
    this.getUserProfileinfo()
    this.setState({
      loading:false
    })
  }
  
  getUserProfileinfo(){
    //this method is same as getuserinfo  but to check the folllowing of Signed In User ,we need list of following user to show Follow /Following Button
    const token=JSON.parse(localStorage.getItem("jwt"))
    getUser(token.user.username).then(data => {
        if(data.error){
            console.log(data.error)
        }
        else{
          
            this.setState({
                userData:data.following,
                
            })  
            
            
    }
  })}
    getUserinfo(){
        const username=this.props.match.params.username
        getUser(username).then(data => {
            if(data.error){
                console.log(data.error)
            }
            else{
              
                this.setState({
                    
                    data:data
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
        this.getUserProfileinfo()
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
             {(JSON.parse(localStorage.getItem("jwt")).user.username !==this.state.data.username) && (this.state.userData.includes(this.state.data.username)?<UnfollowButton user={this.state.data} />:<FollowButton user={this.state.data}/>)}
            </div>
          </div>
          <h1 className="my-3 text-center">Your Tweets</h1>
         
            {this.state.tweetsData.map((tweet,index) => {
              return(
                <div className="card mt-4" key={index} >
            <div className="card-body">
              <h5 className="card-title">{this.state.data.name}</h5>
              <h6 className="card-subtitle mb-4 text-muted">@{this.state.data.username}</h6>
              <p className="card-text">{tweet.tweet}</p>
            </div>
          </div>
              )
            })}
            
        
          
         
          
        </div>
        <DiscoverPeople data={this.state.userData} hello='Hii'/>
      </div>
    </div>
        )
    }
}
    }
