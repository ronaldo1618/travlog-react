import React, { useRef, useEffect, useState } from 'react';
import apiManager from '../../modules/apiManager';

export default function DayItineraryForm(props) {

    const name = useRef()
    const description = useRef()
    const [day_itinerary, setDayItinerary] = useState({})

    const onSubmitHandler = e => {
        const day_itinerary = {
            name: name.current.value,
            description: description.current.value,
            trip_id: props.tripId
        }
        apiManager.postDayItinerary(day_itinerary).then(() => props.history.push(`/trips/${props.tripId}`))
    }

    const editDayItinerary = () => {
        const day_itinerary = {
            id: props.day_itinerary_id,
            name: name.current.value,
            description: description.current.value,
            trip_id: props.tripId
        }
        apiManager.putObj('day_itinerarys', day_itinerary)
        props.history.push(`/trips/${props.tripId}`)
    }

    useEffect(() => {
        if(props.day_itinerary_id){
            apiManager.getById('day_itinerarys', props.day_itinerary_id).then(obj => {
                console.log(obj)
                setDayItinerary(obj)
            })
        }
    },[props.transportationId])

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
                        defaultValue={day_itinerary.name}
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="description"> Description </label>
                    <input ref={description} type="text"
                        name="description"
                        className="form-control"
                        placeholder="description"
                        defaultValue={day_itinerary.description}
                        required autoFocus />
                </fieldset>
                <fieldset>
                    {props.day_itinerary_id ? 
                        <button type="button" onClick={editDayItinerary}>
                            Update Itinerary Day
                        </button>
                        :
                        <button type="button" onClick={onSubmitHandler}>
                            Create Itinerary Day
                        </button>
                    }
                </fieldset>
            </form>
        </main>
    )
}