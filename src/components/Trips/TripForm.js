import React, { useRef, useState, useEffect } from 'react';
import apiManager from '../../modules/apiManager';

export default function TripForm(props) {

    const title = useRef()
    const description = useRef()
    const trip_length = useRef()
    const start_date = useRef()
    const end_date = useRef()
    const [is_public, setIsPublic] = useState(false)
    const [user, setUser] = useState(Number)
    const [trip, setTrip] = useState({})
    const handleClick = () => setIsPublic(!is_public)

    const onSubmitHandler = e => {
        const trip = {
            title: title.current.value,
            description: description.current.value,
            trip_length: trip_length.current.value,
            start_date: start_date.current.value,
            end_date: end_date.current.value,
            is_public: is_public
        }
        apiManager.postObj('trips', trip)
        props.history.push('/trips')
    }

    const editTrip = () => {
        const trip = {
            id: props.tripId,
            title: title.current.value,
            description: description.current.value,
            trip_length: trip_length.current.value,
            start_date: start_date.current.value,
            end_date: end_date.current.value,
            is_public: is_public
        }
        apiManager.putObj('trips', trip)
        props.history.push(`/trips/${props.tripId}`)
    }

    const getUser = () => {
        apiManager.getTraveler().then(user => setUser(user[0].id))
    }

    useEffect(getUser, [])
    useEffect(() => {
        if(props.tripId){
            apiManager.getById('trips', props.tripId).then(obj => {
                setTrip(obj)
            })
        }
    },[props.tripId])

    return (
        <>
        {user === trip.creator_id ?
            <main>
                <form>
                    <h1>Trip Form</h1>
                    <fieldset>
                        <label htmlFor="title"> Title </label>
                        <input ref={title} type="text"
                            name="title"
                            className="form-control"
                            placeholder="title"
                            defaultValue={trip.title}
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="description"> Description </label>
                        <input ref={description} type="text"
                            name="description"
                            className="form-control"
                            placeholder="description"
                            defaultValue={trip.description}
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="trip_length"> Trip Length </label>
                        <input ref={trip_length} type="number"
                            name="trip_length"
                            className="form-control"
                            placeholder="trip_length"
                            defaultValue={trip.trip_length}
                            required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="start_date"> Start Date </label>
                        <input ref={start_date} type="date"
                            name="start_date"
                            className="form-control"
                            defaultValue={trip.start_date}
                            required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="end_date"> End Date </label>
                        <input ref={end_date} type="date"
                            name="end_date"
                            className="form-control"
                            defaultValue={trip.end_date}
                            placeholder="end_date"
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="is_public"> Make Trip Public</label>
                        <input onChange={handleClick} type="checkbox"
                            name="is_public"
                            className="form-control"
                            placeholder="is_public"
                            defaultValue={trip.is_public}
                        />
                    </fieldset>
                    <fieldset>
                        {
                            props.tripId ?
                            <button type="button" onClick={editTrip}>
                                Update Trip
                            </button>
                            :
                            <button type="button" onClick={onSubmitHandler}>
                                Create Trip
                            </button>
                        }
                    </fieldset>
                </form>
            </main>
            :
            null
        }
        </>
    )
}