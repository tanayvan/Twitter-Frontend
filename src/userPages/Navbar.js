import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { token } from '../Backend'

export default class Navbar extends Component {
    render() {
        return (
            <div className="col-lg-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link active" >Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/${token.user.username}`}>Profile</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" >Explore</Link>
            </li>
           
          </ul>
        </div>
        )
    }
}
