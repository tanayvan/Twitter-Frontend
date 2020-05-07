import React, { Component } from 'react'
import Navbar from '../Profile/Navbar'
import DiscoverPeople from '../Profile/DiscoverPeople'
import { insertTweet, getUser, getTweetsForFeed } from '../Apicalls'


export default class HomePage extends Component {
    constructor(props){
        super(props)
        this.state={
            tweet:"",
            error:"",
            userData:[],
            loading:true,
            feedTweet:[]
        }
        this.getUserinfo()
        this.getFeedTweet()
        this.handleChange=this.handleChange.bind(this)
        this.handleClick=this.handleClick.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    
    componentDidMount(){
        this.setState({
          loading:true
        })
      
        this.getUserinfo()
        this.setState({
          loading:false
        })
      }
      getFeedTweet(){
        const token=JSON.parse(localStorage.getItem("jwt"))
        getTweetsForFeed(token.user.username).then(data =>{
          if(data.error){
            return(console.log(data.error))
          }
          this.setState({
            feedTweet:data.tweet
          })
          console.log(this.state.feedTweet)
        }).catch(error => console.log(error))
      }
    getUserinfo(){
        const token=JSON.parse(localStorage.getItem("jwt"))
        getUser(token.user.username).then(data => {
            if(data.error){
                console.log(data.error)
            }
            else{
              
                this.setState({
                    userData:data.following,
                    
                })  
              //  console.log(this.state.userData)
                
        }
          
        }).catch(error =>console.log(error))
    }
    componentDidUpdate(prevProps, prevState){
        if (prevState.userData !== this.state.userData) {
       
      this.getUserinfo()
      this.setState({
        loading:false
      })
        }
      }
    handleClick(){
        
        console.log(this.state.tweet)
        insertTweet({tweet:this.state.tweet},JSON.parse(localStorage.getItem('jwt')).user.username)
        .then(data => {
            if(data.error){
                this.setState({
                    error:data.error
                })
            }
            else{
                console.log(data)
                this.setState({
                    tweet:""
                })
            }
           
        }).catch(error => {
            console.log(error)
        })
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
          <p className="twitter-title">Home</p>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="What's Happening ?  Tweet Here" aria-label="Username" aria-describedby="basic-addon1" onChange={this.handleChange} value={this.state.tweet} name='tweet'/>
            <button type="button" className="btn btn-dark" onClick={this.handleClick}>Tweet</button>
            
          </div>
        {this.state.feedTweet.map((tweet,index) => {
          return(
            <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">{tweet.user.name}</h5>
              <h6 className="card-subtitle mb-4 text-muted">@{tweet.user.username}</h6>
          <p className="card-text">{tweet.tweet}</p>
           
            </div>
          </div>
          )
        }) 
          
        }
          
         
        </div>
        <DiscoverPeople data={this.state.userData}/>
        </div>
      </div>
   
        )
    }
}
}
