import React from 'react';
import apiManager from '../../../modules/apiManager';
import ItineraryCard from './ItineraryCard';

export default function ItineraryList(props) {

    const deleteObj = (type, id) => {
        apiManager.deleteObj(type, id).then(props.getTrip)
    }

    return (
        <>
            <h1>{props.itinerary_day.name}</h1>
            <h1>{props.itinerary_day.description}</h1>
            {
                props.itinerary_day.all_activities.map((activity, index) => <ItineraryCard key={index} activity={activity} userId={props.userId} creatorId={props.creatorId} {...props} deleteObj={deleteObj}/>)
            }
        </>
    )
}