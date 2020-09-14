import React, { useState, useEffect } from 'react';
import apiManager from '../../modules/apiManager';
import ItineraryList from './Itinerary/ItineraryList';

export default function TripDetails(props) {


    const [totalCost, setTotalCost] = useState(Number)
    const [user, setUser] = useState(Number)
    const [ trip, setTrip ] = useState({})
    const [ itinerary, setItinerary ] = useState([{all_activities: []}])

    const getTrip = () => {
        apiManager.getTrip(props.tripId).then(setTrip).then(getItinerary)
    }
    
    const getItinerary = () => {
        apiManager.getItinerary(props.tripId).then(itinerary => {
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

    const getUser = () => {
        apiManager.getTraveler().then(user => setUser(user[0].id))
    }

    useEffect(getUser, [])
    useEffect(getTrip, [])

    return (
        <>
            <h1>{trip.title}</h1>
            <h1>{trip.description}</h1>
            <h2>Trip Cost: ${totalCost}</h2>
            {user === trip.creator_id ?
                <div className="budget-container">
                    <input type="button" value="Add Transportation" onClick={() => {props.history.push(`/transportations/form/${props.tripId}`)}}/>
                    <input type="button" value="Add Food" onClick={() => {props.history.push(`/foods/form/${props.tripId}`)}}/>
                    <input type="button" value="Add Activity" onClick={() => {props.history.push(`/activitys/form/${props.tripId}`)}}/>
                    <input type="button" value="Add Lodging" onClick={() => {props.history.push(`/lodgings/form/${props.tripId}`)}}/>
                    <input type="button" value="Add New Day" onClick={() => {props.history.push(`/day_itinerarys/form/${props.tripId}`)}}/>
                </div>
                :
                null
            }
            {itinerary.map((itinerary_day, index) => <ItineraryList key={index} userId={user} itinerary_day={itinerary_day} getTrip={getTrip} creatorId={trip.creator_id} {...props}/>)}
            {/* {itinerary.map(day_itinerary => { */}
                {/* <div>{day_itinerary.title}</div> */}
                {/* let itinerary_arr = [...day_itinerary.activities,...day_itinerary.food,...day_itinerary.lodging,...day_itinerary.transportation]
                itinerary_arr.sort((a,b) => new Date(a.datetime) - new Date(b.datetime)) */}
                {/* itinerary_arr.map(itinerary => console.log(itinerary)) */}

                {/* day_itinerary.activities.map(activity => console.log(activity))
                day_itinerary.food.map(food => console.log(food))
                day_itinerary.lodging.map(lodging => console.log(lodging))
                day_itinerary.transportation.map(transportation => console.log(transportation)) */}
            {/* })} */}
        </>
    )
}