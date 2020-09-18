import React, { useState, useEffect } from 'react';
import TripCard from './TripCard';
import apiManager from '../../modules/apiManager';
import { Button } from 'reactstrap';

export default function TripList(props) {

    const [user, setUser] = useState(Number)
    const [ trips, setTrips ] = useState([])

    const getTrips = () => {
        apiManager.getTrips().then(trips => {
            trips.sort((a,b) => b.id - a.id)
            setTrips(trips)
        })
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
            <div className="flex-center">
                <h1>Trips</h1>
            </div>
            <div className="new-entry-btn">
                <Button color="primary" type="button" onClick={() => {props.history.push("/trips/form")}}>New Trip</Button>
            </div>
            <div className="trip-cards">
                {trips.map(trip => <TripCard key={trip.id} userId={user} tripId={trip.id} trip={trip} deleteObj={deleteObj} {...props}/>)}
            </div>
        </>
    )
}