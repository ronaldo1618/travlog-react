import React from 'react'

export default function TripCard(props) {
    return (
        <div>
            <p>{props.trip.id}</p>
            <p>{props.trip.creator_id}</p>
            <p>{props.trip.title}</p>
            <p>{props.trip.description}</p>
            <p>{props.trip.start_date}</p>
            <p>{props.trip.end_date}</p>
            <p>{props.trip.trip_length}</p>
        </div>
    )
}