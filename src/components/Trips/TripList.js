import React, { useState, useEffect } from 'react';
import TripCard from './TripCard';
import apiManager from '../../modules/apiManager';

export default function TripList(props) {

    const [user, setUser] = useState(Number)
    const [ trips, setTrips ] = useState([])

    const getTrips = () => {
        apiManager.getTrips().then(setTrips)
    }

    const deleteObj = (type, id) => {
        apiManager.deleteObj(type, id).then(getTrips)
    }

    const getUser = () => {
        apiManager.getTraveler().then(user => setUser(user[0].id))
    }

    useEffect(getUser, [])
    useEffect(getTrips, [])

    return (
        <>
            <div>
                <input type="button" value="New Entry" onClick={() => {props.history.push("/trips/form")}}/>
            </div>
            <div>
                {trips.map(trip => <TripCard key={trip.id} userId={user} tripId={trip.id} trip={trip} deleteObj={deleteObj} {...props}/>)}
            </div>
        </>
    )
}