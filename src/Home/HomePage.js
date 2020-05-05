import React, { Component } from 'react'
import Navbar from '../Profile/Navbar'
import DiscoverPeople from '../Profile/DiscoverPeople'
import { insertTweet } from '../Apicalls'


export default class HomePage extends Component {
    constructor(){
        super()
        this.state={
            tweet:"",
            error:""
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleClick=this.handleClick.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]:event.target.value
        })
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
        
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-4 text-muted">@Card subtitle</h6>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
           
            </div>
          </div>
         
        </div>
        <DiscoverPeople />
        </div>
      </div>
   
        )
    }
}
