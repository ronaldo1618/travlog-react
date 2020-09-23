import React, { useEffect, useState } from 'react';
import apiManager from '../../modules/apiManager';
import { Button } from 'react-bootstrap';
import TripCard from '../Trips/TripCard';

export default function Account(props) {

    const [trips, setTrips] = useState([])
    const [traveler, setTraveler] = useState({user:{}})
    const [tripCreators, setTripCreators] = useState([{user:{}}])
    const [loading, setLoading] = useState(false)

    const getTraveler = () => {
        setLoading(true)
        apiManager.getTraveler().then(traveler => {
            if(!props.userProfileId) setTripCreators(traveler)
            setTraveler(traveler[0])
            getTrips(traveler[0])
        })
    }

    const getTrips = (traveler) => {
        if(traveler.id === props.userProfileId || !props.userProfileId) {
            apiManager.getTrips().then(trips => {
                settingTrips(trips)
            })
        } else {
            apiManager.getTripsById(props.userProfileId).then(trips => {
                settingTrips(trips)
            })
        }
    }

    const settingTrips = (trips) => {
        let creators = []
        trips.sort((a,b) => b.id - a.id)
        trips.forEach(trip => {
            creators.push(trip.creator)
        });
        if(creators.length === 0) {
            if(props.userProfileId) {
                apiManager.getById('travelers', props.userProfileId).then(res => {
                    let creatorArr = []
                    creatorArr.push(res)
                    setTripCreators(creatorArr)
                })
            }
        } else {
            setTripCreators(creators)
        }
        setTrips(trips)
        setLoading(false)
    }
 
    const deleteObj = (type, id) => {
        apiManager.deleteObj(type, id).then(getTrips)
    }

    useEffect(getTraveler, [])

    return (
        <>
        <div className="profile-container">
            <div className="profile">
                {tripCreators[0].profile_pic ?
                <div className="profile-img-div">
                    <img className="profile-img-big" alt="" src={tripCreators[0].profile_pic}/>
                </div>
                : null
                }
                <h2>{tripCreators[0].user.username}</h2>
                <p>{tripCreators[0].bio}</p>
                {traveler.id === props.userProfileId || !props.userProfileId ?
                <Button type="button" onClick={() => props.history.push(`/profile/form`)}>Edit Account</Button>
                :
                null
                }
            </div>
        </div>
        <hr/>
        <div className="trip-history">
            <h1>Trip History</h1>
        </div>
        <hr/>
        <div className="trip-cards">
            {!loading ?
            <>
            {trips.map((trip, index) => <TripCard key={trip.id} userId={traveler.id} tripId={trip.id} trip={trip} deleteObj={deleteObj} creator={tripCreators[index]} {...props}/>)}
            </>
            :
            null
            }
        </div>
        </>
    )
}