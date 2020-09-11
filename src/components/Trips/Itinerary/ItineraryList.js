import React from 'react';
import ItineraryCard from './ItineraryCard';

export default function ItineraryList(props) {
    return (
        <>
            <h1>{props.itinerary_day.name}</h1>
            <h1>{props.itinerary_day.description}</h1>
            {
                props.itinerary_day.all_activities.map((activity, index) => <ItineraryCard key={index} activity={activity} {...props}/>)
            }
        </>
    )
}