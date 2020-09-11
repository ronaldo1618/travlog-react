import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

export default function ApplicationViews(props) {

    const setCurrentUser = props.setCurrentUser

    return (
        <>
            <Route exact path='/' render={props => {
                return <Home setIsCurrentUser={setCurrentUser} {...props} />
            }}
            />
            <Route exact path='/register' render={props => {
                return <Register setIsCurrentUser={setCurrentUser} {...props} />
            }}
            />
            <Route exact path='/login' render={props => {
                return <Login setIsCurrentUser={setCurrentUser} {...props} />
            }}
            />
        </>
    )
}