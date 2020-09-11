import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import TripList from './components/Trips/TripList';
import TripForm from './components/Trips/TripForm';
import TripDetails from './components/Trips/TripDetails';

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
            <Route exact path='/trips' render={props => {
                return <TripList setIsCurrentUser={setCurrentUser} {...props} />
            }}
            />
            <Route exact path='/trips/:tripId' render={props => {
                return <TripDetails tripId={parseInt(props.match.params.tripId)} setIsCurrentUser={setCurrentUser} {...props} />
            }}
            />
            <Route exact path='/trips/form' render={props => {
                return <TripForm setIsCurrentUser={setCurrentUser} {...props} />
            }}
            />
        </>
    )
}