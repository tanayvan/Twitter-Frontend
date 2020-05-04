import React from 'react'
import{BrowserRouter,Switch, Route} from 'react-router-dom'
import Login from './Auth/Login' 
import Signup from './Auth/Signup'
import Profile from './userPages/Profile'
export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login}></Route>
                <Route path='/signup' exact component={Signup}></Route>
                <Route path='/:username' exact component={Profile}></Route>
            </Switch>
            
        </BrowserRouter>
    )
}
