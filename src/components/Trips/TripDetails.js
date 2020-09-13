import React, { useState, useEffect } from 'react';
import apiManager from '../../modules/apiManager';
import ItineraryList from './Itinerary/ItineraryList';
import TransportationForm from './Itinerary/TransportationForm';

export default function TripDetails(props) {

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
        })
    }

    useEffect(getTrip, [])
    // useEffect(getItinerary, [])

    return (
        <>
            <div className="budget-container">
                <input type="button" value="Add Transportation" onClick={() => {props.history.push(`/transportations/form/${props.tripId}`)}}/>
                <input type="button" value="Add Food" onClick={() => {props.history.push("/foods/form")}}/>
                <input type="button" value="Add Activity" onClick={() => {props.history.push("/activitys/form")}}/>
                <input type="button" value="Add Lodging" onClick={() => {props.history.push("/lodgings/form")}}/>
                <input type="button" value="Add New Day" onClick={() => {props.history.push(`/day_itinerarys/form/${props.tripId}`)}}/>
            </div>
            {itinerary.map((itinerary_day, index) => <ItineraryList key={index} itinerary_day={itinerary_day} getTrip={getTrip} {...props}/>)}
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