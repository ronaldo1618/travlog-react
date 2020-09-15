import React, { useState, useEffect } from 'react';
import apiManager from '../../modules/apiManager';
import TripCard from '../Trips/TripCard';
import ItineraryList from '../Trips/Itinerary/ItineraryList';

export default function Home(props) {

    const [user, setUser] = useState(Number)
    const [trips, setTrips] = useState([])
    // const [type, setType] = useState('')
    const [userHomePageTrip, setUserHomePageTrip] = useState({})
    const [totalCost, setTotalCost] = useState(Number)
    const [itinerary, setItinerary] = useState([{all_activities: []}])

    const getTrips = () => {
        apiManager.getTripsForHomepage().then(trip => {
            setTrips(trip)
        })
    }

    const getTrip = () => {
        apiManager.getTraveler().then(user => {
            setUser(user[0].id)
            apiManager.getUserTripForHomePage().then(trip => {
                if (trip.length === 0) return
                setUserHomePageTrip(trip[0])
                getItinerary(trip[0].id)
                // setType(trip[0].url.split('8000/')[1].split('/')[0])
            })
        })
    }

    const getItinerary = (id) => {
        apiManager.getItinerary(id).then(itinerary => {
            itinerary.forEach(itinerary_day => {
                itinerary_day.all_activities = [...itinerary_day.activities,...itinerary_day.food,...itinerary_day.lodging,...itinerary_day.transportation]
                itinerary_day.all_activities.sort((a,b) => new Date(a.datetime) - new Date(b.datetime))
            });
            setItinerary(itinerary)
            calculateTotalCost(itinerary)
        })
    }

    const calculateTotalCost = (itinerary) => {
        let totalCost = 0
        itinerary.forEach(itinerary_day => {
            itinerary_day.all_activities.forEach(activity => {
                totalCost += activity.cost
            })
        })
        setTotalCost(totalCost.toFixed(2))
    }

    // const deleteObj = (type, id) => {
    //     apiManager.deleteObj(type, id).then(props.history.push('/'))
    // }

    useEffect(getTrip, [])
    useEffect(getTrips, [])

    return (
        <>
            {userHomePageTrip.id ?
                <>
                <h1><a href={`/trips/${userHomePageTrip.id}`}>{userHomePageTrip.title}</a></h1>
                <h3>Description: {userHomePageTrip.description}</h3>
                <h3>Trip Cost: ${totalCost}</h3>
                <div>
                    {user === userHomePageTrip.creator_id ?
                        <div className="budget-container">
                            <input type="button" value="Add Transportation" onClick={() => {props.history.push(`/transportations/form/${userHomePageTrip.id}`)}}/>
                            <input type="button" value="Add Food" onClick={() => {props.history.push(`/foods/form/${userHomePageTrip.id}`)}}/>
                            <input type="button" value="Add Activity" onClick={() => {props.history.push(`/activitys/form/${userHomePageTrip.id}`)}}/>
                            <input type="button" value="Add Lodging" onClick={() => {props.history.push(`/lodgings/form/${userHomePageTrip.id}`)}}/>
                            {/* <input type="button" value="Add New Day" onClick={() => {props.history.push(`/day_itinerarys/form/${userHomePageTrip.id}`)}}/>
                            <button type='button' onClick={() => deleteObj(type, userHomePageTrip.id)}>Delete</button>
                            <button type='button' onClick={() => props.history.push(`/trips/form/${userHomePageTrip.id}`)}>Edit</button> */}
                        </div>
                        :
                        <input type="button" value="Copy Trip" onClick={() => {props.history.push(`/day_itinerarys/form/${userHomePageTrip.id}`)}}/>
                    }
                </div>
                {itinerary.length === 0 ?
                    null
                    :
                    <>
                        <hr/>
                        <h4>Itinerary</h4>
                        <hr/>
                    </>
                }
                <div>
                    {itinerary.map((itinerary_day, index) => <ItineraryList key={index} userId={user} itinerary_day={itinerary_day} getTrip={getTrip} creatorId={userHomePageTrip.creator_id} {...props}/>)}
                </div>
                </>
                :
                null
            }
            <hr/>
            <h1>Explore</h1>
            <div>
                <>{trips.map(trip => <TripCard key={trip.id} userId={user} tripId={trip.id} trip={trip} {...props}/>)}</>
            </div>
        </>
    )
}