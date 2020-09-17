import React, { useEffect, useState } from 'react';
import apiManager from '../../modules/apiManager';
import TripCard from '../Trips/TripCard';

export default function Account(props) {

    const [traveler, setTraveler] = useState({user:{}})
    const [trips, setTrips] = useState([])

    const getTraveler = () => {
        apiManager.getTraveler().then(traveler => setTraveler(traveler[0]))
    }

    const getTrips = () => {
        apiManager.getTrips().then(setTrips)
    }

    const deleteObj = (type, id) => {
        apiManager.deleteObj(type, id).then(getTrips)
    }

    useEffect(getTraveler, [])
    useEffect(getTrips, [])

    return (
        <>
        <h2>{traveler.user.username}</h2>
        <p>{traveler.bio}</p>
        <button type="button" onClick={() => props.history.push(`/profile/form`)}>Edit Account</button>
        <h4>Trip History</h4>
        <div>
            {trips.map(trip => <TripCard key={trip.id} tripId={trip.id} trip={trip} deleteObj={deleteObj} {...props}/>)}
        </div>
        </>
    )
}