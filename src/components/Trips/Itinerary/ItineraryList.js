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
        <div className=''>
            {!showItinerary ?
                <div className="itin-list">
                    <div onClick={toggle} className="flex-center itinerary-toggle effect-shadow">
                        {props.userId === props.creatorId ?
                        <div className="itinerary-btn-container">
                            <Icon size="large" link onClick={() => deleteObj('day_itinerarys', props.itinerary_day.id)} className="trash trash-edit"></Icon>
                            <div>
                                <h2><Icon className="angle down"></Icon>{props.itinerary_day.name}</h2>
                                <h4>{props.itinerary_day.description}</h4>
                            </div>
                            <Icon size="large" link onClick={() => props.history.push(`/day_itinerarys/form/${props.itinerary_day.trip_id}/${props.itinerary_day.id}`)} className="edit trash-edit"></Icon>
                        </div>
                        :
                        <div className="itinerary-container">
                            <h2><Icon className="angle down"></Icon>{props.itinerary_day.name}</h2>
                            <h4>{props.itinerary_day.description}</h4>
                        </div>
                        }
                    </div>
                    {
                        props.itinerary_day.all_activities.map((activity, index) => <ItineraryCard key={index} activity={activity} userId={props.userId} creatorId={props.creatorId} {...props} deleteObj={deleteObj}/>)
                    }
                </div>
                :
                <div onClick={toggle} className="flex-center itinerary-toggle effect-shadow">
                    {props.userId === props.creatorId ?
                    <div className="itinerary-btn-container">
                        <Icon size="large" link onClick={() => deleteObj('day_itinerarys', props.itinerary_day.id)} className="trash trash-edit"></Icon>
                        <div>
                            <h2><Icon className="angle right"></Icon>{props.itinerary_day.name}</h2>
                            <h4>{props.itinerary_day.description}</h4>
                        </div>
                        <Icon size="large" link onClick={() => props.history.push(`/day_itinerarys/form/${props.itinerary_day.trip_id}/${props.itinerary_day.id}`)} className="edit trash-edit"></Icon>
                    </div>
                    :
                    <div className="itinerary-container">
                        <h2><Icon className="angle right"></Icon>{props.itinerary_day.name}</h2>
                        <h4>{props.itinerary_day.description}</h4>
                    </div>
                    }
                </div>
            }
        </div>
    )
}