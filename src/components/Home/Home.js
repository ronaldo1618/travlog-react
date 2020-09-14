import React, { useState, useEffect } from 'react';
import apiManager from '../../modules/apiManager';
import TripCard from '../Trips/TripCard';

export default function Home(props) {

    const [user, setUser] = useState(Number)
    const [trips, setTrips] = useState([])

    const getTrips = () => {
        apiManager.getTripsForHomepage().then(setTrips)
    }

    const getUser = () => {
        apiManager.getTraveler().then(user => setUser(user[0].id))
    }

    useEffect(getUser, [])
    useEffect(getTrips, [])

    return (
        <>
            <div>
                <>{trips.map(trip => <TripCard key={trip.id} userId={user} tripId={trip.id} trip={trip} {...props}/>)}</>
            </div>
        </>
    )
}