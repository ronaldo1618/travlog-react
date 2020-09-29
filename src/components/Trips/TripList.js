import React, { useState, useEffect } from 'react';
import TripCard from './TripCard';
import apiManager from '../../modules/apiManager';
import { Button } from 'reactstrap';

export default function TripList(props) {

    const [user, setUser] = useState(Number)
    const [loading, setLoading] = useState(false)
    const [trips, setTrips] = useState([])
    const [tripCreators, setTripCreators] = useState([{user:{}}])

    const getTrips = () => {
        setLoading(true)
        apiManager.getTrips().then(trips => {
            let creators = []
            trips.sort((a,b) => b.id - a.id)
            trips.forEach(trip => {
                creators.push(trip.creator)
            });
            setTripCreators(creators)
            setTrips(trips)
            setLoading(false)
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
        <div className="trip-list-view">
            <div className="itin-list">
                <h1 className="header-title">Trips</h1>
            </div>
            <hr/>
            <div className="new-entry-btn">
                <Button color="primary" type="button" onClick={() => {props.history.push("/trips/form")}}>New Trip</Button>
            </div>
            {!loading ?
            <div className="trip-cards">
                {trips.map((trip, index) => <TripCard key={trip.id} userId={user} tripId={trip.id} trip={trip} deleteObj={deleteObj} creator={tripCreators[index]} {...props}/>)}
            </div>
            :
            null
            }
        </div>
    )
}