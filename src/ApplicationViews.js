import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import TripList from './components/Trips/TripList';
import TripForm from './components/Trips/TripForm';
import TripDetails from './components/Trips/TripDetails';
import TransportationForm from './components/Trips/Itinerary/TransportationForm';
import FoodForm from './components/Trips/Itinerary/FoodForm';
import ActivityForm from './components/Trips/Itinerary/ActivityForm';
import LodgingForm from './components/Trips/Itinerary/LodgingForm';
import DayItineraryForm from './components/Trips/DayItineraryForm';
import Account from './components/Account/Account';
import AccountForm from './components/Account/AccountForm';
import NotFound from './components/404/NotFound';
import apiManager from './modules/apiManager';

export default function ApplicationViews(props) {

    const isAuthenticated = () =>
        false || localStorage.getItem('travlogapi_token') !== null

    const isCreator = (tripId) => {
        apiManager.getTraveler().then(user => {
            apiManager.getTrip(parseInt(tripId)).then(trip => {
                if(user[0].id === trip.creator_id) return true;
                else return false;
            })
        })
    }

    const setCurrentUser = props.setCurrentUser

    return (
        <>
            <Switch>
            <Route exact path='/register' render={props => {
                return <Register setIsCurrentUser={setCurrentUser} {...props} />
            }}
            />
            <Route path='/login' render={props => {
                return <Login setIsCurrentUser={setCurrentUser} {...props} />
            }}
            />
            <Route exact path='/' render={props => {
                if(isAuthenticated()) {
                    return <Home {...props} />
                } else {
                    return <Redirect to="Login"/>
                }
            }}
            />
            <Route exact path='/profile' render={props => {
                if(isAuthenticated()) {
                    return <Account {...props} />
                } else {
                    return <Redirect to="Login"/>
                }
            }}
            />
            <Route exact path='/profile/form' render={props => {
                if(isAuthenticated()) {
                    return <AccountForm {...props} />
                } else {
                    return <Redirect to="Login"/>
                }
            }}
            />
            <Route exact path='/trips' render={props => {
                if(isAuthenticated()) {
                    return <TripList {...props} />
                } else {
                    return <Redirect to="Login"/>
                }
            }}
            />
            <Route exact path='/trips/:tripId(\d+)' render={props => {
                if(isAuthenticated()) {
                    return <TripDetails tripId={parseInt(props.match.params.tripId)} {...props} />
                } else {
                    return <Redirect to="Login"/>
                }
            }}
            />
            <Route exact path='/trips/form' render={props => {
                if(isAuthenticated()) {
                    return <TripForm {...props} />
                } else {
                    return <Redirect to="Login"/>
                }
            }}
            />
            <Route exact path='/trips/form/:tripId' render={props => {
                if(isAuthenticated()) {
                    if(isCreator(props.match.params.tripId)) return <TripForm tripId={parseInt(props.match.params.tripId)} {...props} />
                    else return <Redirect to="/"/>
                } else {
                    return <Redirect to="Login"/>
                }
            }}
            />
            <Route exact path='/day_itinerarys/form/:tripId' render={props => {
                if(isAuthenticated()) {
                    if(isCreator(props.match.params.tripId)) return <DayItineraryForm tripId={parseInt(props.match.params.tripId)} {...props} />
                    else return <Redirect to="/"/>
                } else {
                    return <Redirect to="Login"/>
                }
            }}
            />
            <Route exact path='/transportations/form/:tripId' render={props => {
                if(isAuthenticated()) {
                    if(isCreator(props.match.params.tripId)) return <TransportationForm tripId={parseInt(props.match.params.tripId)} {...props} />
                    else return <Redirect to="/"/>
                } else {
                    return <Redirect to="Login"/>
                }
            }}
            />
            <Route exact path='/transportations/form/:tripId/:transportationId(\d+)' render={props => {
                if(isAuthenticated()) {
                    if(isCreator(props.match.params.tripId)) return <TransportationForm tripId={parseInt(props.match.params.tripId)} transportationId={parseInt(props.match.params.transportationId)} {...props} />
                    else return <Redirect to="/"/>
                } else {
                    return <Redirect to="Login"/>
                }
            }}
            />
            <Route exact path='/foods/form/:tripId' render={props => {
                if(isAuthenticated()) {
                    if(isCreator(props.match.params.tripId)) return <FoodForm tripId={parseInt(props.match.params.tripId)} {...props} />
                    else return <Redirect to="/"/>
                } else {
                    return <Redirect to="Login"/>
                }
            }}
            />
            <Route exact path='/foods/form/:tripId/:foodId(\d+)' render={props => {
                if(isAuthenticated()) {
                    if(isCreator(props.match.params.tripId)) return <FoodForm tripId={parseInt(props.match.params.tripId)} foodId={parseInt(props.match.params.foodId)} {...props} />
                    else return <Redirect to="/"/>
                } else {
                    return <Redirect to="Login"/>
                }
            }}
            />
            <Route exact path='/activitys/form/:tripId' render={props => {
                if(isAuthenticated()) {
                    if(isCreator(props.match.params.tripId)) return <ActivityForm tripId={parseInt(props.match.params.tripId)} {...props} />
                    else return <Redirect to="/"/>
                } else {
                    return <Redirect to="Login"/>
                }
            }}
            />
            <Route exact path='/activitys/form/:tripId/:activityId(\d+)' render={props => {
                if(isAuthenticated()) {
                    if(isCreator(props.match.params.tripId)) return <ActivityForm tripId={parseInt(props.match.params.tripId)} activityId={parseInt(props.match.params.activityId)} {...props} />
                    else return <Redirect to="/"/>
                } else {
                    return <Redirect to="Login"/>
                }
            }}
            />
            <Route exact path='/lodgings/form/:tripId' render={props => {
                if(isAuthenticated()) {
                    if(isCreator(props.match.params.tripId)) return <LodgingForm tripId={parseInt(props.match.params.tripId)} {...props} />
                    else return <Redirect to="/"/>
                } else {
                    return <Redirect to="Login"/>
                }
            }}
            />
            <Route exact path='/lodgings/form/:tripId/:lodgingId(\d+)' render={props => {
                if(isAuthenticated()) {
                    if(isCreator(props.match.params.tripId)) return <LodgingForm tripId={parseInt(props.match.params.tripId)} lodgingId={parseInt(props.match.params.lodgingId)} {...props} />
                    else return <Redirect to="/"/>
                } else {
                    return <Redirect to="Login"/>
                }
            }}
            />
            <Route component={NotFound}/>
            </Switch>
        </>
    )
}