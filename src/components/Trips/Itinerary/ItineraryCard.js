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
                    <h2>Transportation Icon</h2>
                    <p>{props.activity.name}</p>
                    <p>{props.activity.notes}</p>
                    <p>{props.activity.cost}</p>
                    <p>{props.activity.dep_datetime}</p>
                    <p>{props.activity.dep_info}</p>
                    <p>{props.activity.datetime}</p>
                    <p>{props.activity.arr_info}</p>
                    {props.userId === props.creatorId ?
                        <>
                            <button type='button' onClick={() => props.deleteObj(type, props.activity.id)}>Delete</button>
                            <button type='button' onClick={() => props.history.push(`/transportations/form/${props.tripId}/${props.activity.id}`)}>Edit</button>
                        </>
                        :
                        null
                    }
                </div>
            : null
            }
            {type === 'activitys' ? 
                <div>
                    <h2>Activity Icon</h2>
                    <p>{props.activity.name}</p>
                    <p>{props.activity.notes}</p>
                    <p>{props.activity.cost}</p>
                    <p>{props.activity.address}</p>
                    <p>{props.activity.datetime}</p>
                    {props.userId === props.creatorId ?
                        <>
                            <button type='button' onClick={() => props.deleteObj(type, props.activity.id)}>Delete</button>
                            <button type='button' onClick={() => props.history.push(`/activitys/form/${props.tripId}/${props.activity.id}`)}>Edit</button>
                        </>
                        :
                        null
                    }
                </div>
            : null
            }
            {type === 'foods' ? 
                <div>
                    <h2>Food Icon</h2>
                    <p>{props.activity.name}</p>
                    <p>{props.activity.notes}</p>
                    <p>{props.activity.cost}</p>
                    <p>{props.activity.address}</p>
                    <p>{props.activity.datetime}</p>
                    {props.userId === props.creatorId ?
                        <>
                            <button type='button' onClick={() => props.deleteObj(type, props.activity.id)}>Delete</button>
                            <button type='button' onClick={() => props.history.push(`/foods/form/${props.tripId}/${props.activity.id}`)}>Edit</button>
                        </>
                        :
                        null
                    }
                </div>
            : null
            }
            {type === 'lodgings' ? 
                <div>
                    <h2>Lodging Icon</h2>
                    <p>{props.activity.name}</p>
                    <p>{props.activity.notes}</p>
                    <p>{props.activity.cost}</p>
                    <p>{props.activity.address}</p>
                    <p>{props.activity.check_in}</p>
                    <p>{props.activity.datetime}</p>
                    <p>{props.activity.phone_number}</p>
                    <p>{props.activity.website}</p>
                    <p>{props.activity.address}</p>
                    {props.userId === props.creatorId ?
                        <>
                            <button type='button' onClick={() => props.deleteObj(type, props.activity.id)}>Delete</button>
                            <button type='button' onClick={() => props.history.push(`/lodgings/form/${props.tripId}/${props.activity.id}`)}>Edit</button>
                        </>
                        :
                        null
                    }
                </div>
            : null
            }
        </>
    )
}