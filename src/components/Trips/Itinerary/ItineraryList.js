import React from 'react';
import apiManager from '../../../modules/apiManager';
import ItineraryCard from './ItineraryCard';

export default function ItineraryList(props) {

    const deleteObj = (type, id) => {
        apiManager.deleteObj(type, id).then(props.getTrip)
    }

    return (
        <>
            <h2>{props.itinerary_day.name}</h2>
            <h4>{props.itinerary_day.description}</h4>
            {props.userId === props.creatorId ?
                        <>
                            <button type='button' onClick={() => deleteObj('day_itinerarys', props.itinerary_day.id)}>Delete</button>
                            <button type='button' onClick={() => props.history.push(`/day_itinerarys/form/${props.itinerary_day.trip_id}/${props.itinerary_day.id}`)}>Edit</button>
                        </>
                        :
                        null
                    }
            <hr/>
            {
                props.itinerary_day.all_activities.map((activity, index) => <ItineraryCard key={index} activity={activity} userId={props.userId} creatorId={props.creatorId} {...props} deleteObj={deleteObj}/>)
            }
        </>
    )
}