import React from 'react'

export default function TripCard(props) {
    return (
        <div>
            <a href={`/trips/${props.tripId}`}>{props.trip.id}</a>
            <p>{props.trip.creator_id}</p>
            <p>{props.trip.title}</p>
            <p>{props.trip.description}</p>
            <p>{props.trip.start_date}</p>
            <p>{props.trip.end_date}</p>
            <p>{props.trip.trip_length}</p>
        </div>
    )
}