import React from 'react';

export default function TripCard(props) {

    const type = props.trip.url.split('8000/')[1].split('/')[0]

    return (
        <div>
            <a href={`/trips/${props.tripId}`}>{props.trip.title}</a>
            <p>{props.trip.description}</p>
            <p>{props.trip.start_date}</p>
            <p>{props.trip.end_date}</p>
            <p>{props.trip.trip_length}</p>
            {props.userId === props.trip.creator_id ?
                <>
                    <button type='button' onClick={() => props.deleteObj(type, props.trip.id)}>Delete</button>
                    <button type='button' onClick={() => props.history.push(`/trips/form/${props.trip.id}`)}>Edit</button>
                </>
                :
                null
            }
        </div>
    )
}