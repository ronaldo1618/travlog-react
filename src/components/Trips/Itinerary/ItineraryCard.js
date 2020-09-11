import React from 'react';

// tomorrows to do list
// conditional rendering for itinerary card
// add to itinerary can be handled seperately. Direct them to the proper form depending on which they choose
// handle delete, edit functionality conditonally
//   - before edit or delete will need to decide which activity it is since they have the same id

export default function ItineraryCard(props) {

    const type = props.activity.url.split('8000/')[1].split('/')[0]

    return (
        <>
            {type === 'transportations' ? 
                <div>
                    <p>{props.activity.name}</p>
                    <p>{props.activity.notes}</p>
                    <p>{props.activity.cost}</p>
                    <p>{props.activity.dep_datetime}</p>
                    <p>{props.activity.dep_info}</p>
                    <p>{props.activity.datetime}</p>
                    <p>{props.activity.arr_info}</p>
                    <button type='button' onClick={() => props.deleteTransportation(props.activity.id)}>Delete</button>
                    <button type='button' onClick={() => props.history.push(`/transportations/form/${props.tripId}/${props.activity.id}`)}>Edit</button>
                </div>
            : null
            }
            {type === 'activitys' ? 
                <div>
                    <p>{props.activity.name}</p>
                    <p>{props.activity.notes}</p>
                    <p>{props.activity.cost}</p>
                    <p>{props.activity.address}</p>
                    <p>{props.activity.datetime}</p>
                </div>
            : null
            }
            {type === 'foods' ? 
                <div>
                    <p>{props.activity.name}</p>
                    <p>{props.activity.notes}</p>
                    <p>{props.activity.cost}</p>
                    <p>{props.activity.address}</p>
                    <p>{props.activity.datetime}</p>
                </div>
            : null
            }
            {type === 'lodgings' ? 
                <div>
                    <p>{props.activity.name}</p>
                    <p>{props.activity.notes}</p>
                    <p>{props.activity.cost}</p>
                    <p>{props.activity.address}</p>
                    <p>{props.activity.check_in}</p>
                    <p>{props.activity.datetime}</p>
                    <p>{props.activity.phone_number}</p>
                    <p>{props.activity.website}</p>
                    <p>{props.activity.address}</p>
                </div>
            : null
            }
        </>
    )
}