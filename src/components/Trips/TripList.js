import React, { useState, useEffect } from 'react';
import TripCard from './TripCard';
import apiManager from '../../modules/apiManager';

export default function TripList(props) {

    const [ traveler, setTraveler ] = useState([])
    const [ trips, setTrips ] = useState([])

    const getTraveler = () => {
        apiManager.getTraveler().then(traveler => setTraveler(traveler[0]))
    }

    const getTrips = () => {
        apiManager.getTrips().then(setTrips)
    }
    
    useEffect(getTraveler, [])
    useEffect(getTrips, [])

    console.log('hello', trips)

    return (
        <>
            <div className="budget-container">
                <input type="button" value="New Entry" onClick={() => {props.history.push("./trips/form")}}/>
            </div>
            <div>
                {trips.map(trip => <TripCard key={trip.id} tripId={trip.id} trip={trip} {...props}/>)}
            </div>
        </>
    )
}