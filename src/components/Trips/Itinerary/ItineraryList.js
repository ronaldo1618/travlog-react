import React, { useState } from 'react';
import apiManager from '../../../modules/apiManager';
import ItineraryCard from './ItineraryCard';
import { Icon } from 'semantic-ui-react';

export default function ItineraryList(props) {

    const [showItinerary, setShowItinerary] = useState(false)
    const toggle = () => setShowItinerary(!showItinerary)
    
    const deleteObj = (type, id) => {
        apiManager.deleteObj(type, id).then(props.getTrip)
    }

    return (
        <>
            <hr/>
            {!showItinerary ?
                <div>
                    <div onClick={toggle} className="itinerary-toggle">
                        <h2><Icon className="angle down"></Icon>{props.itinerary_day.name}</h2>
                        <h4>{props.itinerary_day.description}</h4>
                    </div>
                    {props.userId === props.creatorId ?
                                <>
                                    <button type='button' onClick={() => deleteObj('day_itinerarys', props.itinerary_day.id)}>Delete</button>
                                    <button type='button' onClick={() => props.history.push(`/day_itinerarys/form/${props.itinerary_day.trip_id}/${props.itinerary_day.id}`)}>Edit</button>
                                </>
                                :
                                null
                            }
                    {
                        props.itinerary_day.all_activities.map((activity, index) => <ItineraryCard key={index} activity={activity} userId={props.userId} creatorId={props.creatorId} {...props} deleteObj={deleteObj}/>)
                    }
                </div>
                :
                <div onClick={toggle} className="itinerary-toggle">
                    <h2><Icon className="angle right"></Icon>{props.itinerary_day.name}</h2>
                    <h4>{props.itinerary_day.description}</h4>
                    {props.userId === props.creatorId ?
                                <>
                                    <button type='button' onClick={() => deleteObj('day_itinerarys', props.itinerary_day.id)}>Delete</button>
                                    <button type='button' onClick={() => props.history.push(`/day_itinerarys/form/${props.itinerary_day.trip_id}/${props.itinerary_day.id}`)}>Edit</button>
                                </>
                                :
                                null
                            }
                </div>
            }
        </>
    )
}