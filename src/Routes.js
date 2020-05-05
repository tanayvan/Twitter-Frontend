import React from 'react'
import{BrowserRouter,Switch, Route} from 'react-router-dom'
import Login from './Auth/Login' 
import Signup from './Auth/Signup'
import Profile from './Profile/Profile'
import HomePage from './Home/HomePage'
export default function Routes(props) {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login}></Route>
                <Route path='/signup' exact component={Signup}></Route>
                <Route path='/home' exact component={HomePage}></Route>
                <Route path='/:username' exact component={Profile}></Route>
                
            </Switch>
            
        </BrowserRouter>
    )
}
