import React, { useRef } from 'react';
// import { useState } from 'react';
import apiManager from '../../modules/apiManager';

export default function DayItineraryForm(props) {

    const name = useRef()
    const description = useRef()

    const onSubmitHandler = e => {
        const day_itinerary = {
            name: name.current.value,
            description: description.current.value,
            trip_id: props.tripId
        }
        apiManager.postDayItinerary(day_itinerary).then(() => props.history.push(`/trips/${props.tripId}`))
    }

    return (
         <main>
            <form>
                <h1>Itinerary Day Form</h1>
                <fieldset>
                    <label htmlFor="name"> name </label>
                    <input ref={name} type="text"
                        name="name"
                        className="form-control"
                        placeholder="name"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="description"> Description </label>
                    <input ref={description} type="text"
                        name="description"
                        className="form-control"
                        placeholder="description"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <button type="button" onClick={onSubmitHandler}>
                        Create Itinerary Day
                    </button>
                </fieldset>
            </form>
        </main>
    )
}