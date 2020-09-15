import React, { useState, useEffect } from 'react';
import apiManager from '../../modules/apiManager';
import ItineraryList from './Itinerary/ItineraryList';

export default function TripDetails(props) {

    const [user, setUser] = useState(Number)
    const [type, setType] = useState('')
    const [ trip, setTrip ] = useState({})
    const [totalCost, setTotalCost] = useState(Number)
    const [ itinerary, setItinerary ] = useState([{all_activities: []}])

    const getTrip = () => {
        apiManager.getTrip(props.tripId).then(trip => {
            setTrip(trip)
            setType(trip.url.split('8000/')[1].split('/')[0])
        }).then(getItinerary)
    }

    const deleteObj = (type, id) => {
        apiManager.deleteObj(type, id).then(props.history.push('/trips/'))
    }
    
    const getItinerary = () => {
        apiManager.getItinerary(props.tripId).then(itinerary => {
            itinerary.forEach(itinerary_day => {
                itinerary_day.all_activities = [...itinerary_day.activities,...itinerary_day.food,...itinerary_day.lodging,...itinerary_day.transportation]
                itinerary_day.all_activities.sort((a,b) => new Date(a.datetime) - new Date(b.datetime))
            });
            itinerary.sort((a,b) => a.id - b.id)
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

    const getUser = () => {
        apiManager.getTraveler().then(user => setUser(user[0].id))
    }

    useEffect(getUser, [])
    useEffect(getTrip, [])

    return (
        <>
            <h1>{trip.title}</h1>
            <h3>{trip.description}</h3>
            <h3>Trip Cost: ${totalCost}</h3>
            <div>
                {user === trip.creator_id ?
                    <div className="budget-container">
                        <input type="button" value="Add Transportation" onClick={() => {props.history.push(`/transportations/form/${props.tripId}`)}}/>
                        <input type="button" value="Add Food" onClick={() => {props.history.push(`/foods/form/${props.tripId}`)}}/>
                        <input type="button" value="Add Activity" onClick={() => {props.history.push(`/activitys/form/${props.tripId}`)}}/>
                        <input type="button" value="Add Lodging" onClick={() => {props.history.push(`/lodgings/form/${props.tripId}`)}}/>
                        <input type="button" value="Add New Day" onClick={() => {props.history.push(`/day_itinerarys/form/${props.tripId}`)}}/>
                        <button type='button' onClick={() => deleteObj(type, trip.id)}>Delete</button>
                        <button type='button' onClick={() => props.history.push(`/trips/form/${trip.id}`)}>Edit</button>
                    </div>
                    :
                    <>
                        {/* <input type="button" value="Copy Trip" onClick={() => {props.history.push(`/day_itinerarys/form/${props.tripId}`)}}/> */}
                    </>
                }
            </div>
            <br/>
            <hr/>
            <h4>Itinerary</h4>
            <hr/>
            {itinerary.map((itinerary_day, index) => <ItineraryList key={index} userId={user} itinerary_day={itinerary_day} getTrip={getTrip} creatorId={trip.creator_id} {...props}/>)}
        </>
    )
}