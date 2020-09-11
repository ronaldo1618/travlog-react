import React, { useState, useEffect } from 'react';
import apiManager from '../../modules/apiManager';
import TripCard from '../Trips/TripCard';

export default function Home(props) {

    const [trips, setTrips] = useState([])

    const getTrips = () => {
        apiManager.getTripsForHomepage().then(setTrips)
    }

    useEffect(getTrips, [])

    return (
        <>
            <div>
                {trips.map(trip => <TripCard key={trip.id} trip={trip} {...props}/>)}
            </div>
        </>
    )
}