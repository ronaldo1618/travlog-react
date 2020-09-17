import React from 'react';

export default function ItineraryCard(props) {

    const type = props.activity.url.split('8000/')[1].split('/')[0]

    return (
        <>
            {type === 'transportations' ? 
                <div>
                    <h2>Transportation Icon</h2>
                    <p>Name: {props.activity.name}</p>
                    <p>Notes: {props.activity.notes}</p>
                    <p>Cost: ${props.activity.cost}</p>
                    <p>Departure Date: {props.activity.dep_datetime.slice(0, 10)}</p>
                    <p>Departure Info: {props.activity.dep_info}</p>
                    <p>Arrival Date: {props.activity.datetime.slice(0, 10)}</p>
                    <p>Arrival Info: {props.activity.arr_info}</p>
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
                    <p>Name: {props.activity.name}</p>
                    <p>Notes: {props.activity.notes}</p>
                    <p>Cost: ${props.activity.cost}</p>
                    <p>Address: {props.activity.address}</p>
                    <p>Date: {props.activity.datetime.slice(0, 10)}</p>
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
                    <p>Name: {props.activity.name}</p>
                    <p>Notes: {props.activity.notes}</p>
                    <p>Cost: ${props.activity.cost}</p>
                    <p>Address: {props.activity.address}</p>
                    <p>Date: {props.activity.datetime.slice(0, 10)}</p>
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
                    <p>Name: {props.activity.name}</p>
                    <p>Notes: {props.activity.notes}</p>
                    <p>Cost: ${props.activity.cost}</p>
                    <p>Address: {props.activity.address}</p>
                    <p>Check-in: {props.activity.check_in.slice(0, 10)}</p>
                    <p>Check-out: {props.activity.datetime.slice(0, 10)}</p>
                    <p>Phone-number: {props.activity.phone_number}</p>
                    <p>Website: {props.activity.website}</p>
                    <p>Address: {props.activity.address}</p>
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
            <hr/>
        </>
    )
}