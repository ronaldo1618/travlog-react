import React, { useRef, useState, useEffect } from 'react';
import apiManager from '../../modules/apiManager';
import { Modal, ModalHeader } from 'reactstrap';


export default function TripForm(props) {

    const title = useRef()
    const description = useRef()
    const trip_length = useRef()
    const start_date = useRef()
    const end_date = useRef()
    const [is_public, setIsPublic] = useState(false)
    const [homepage_trip, setHomePageTrip] = useState(false)
    const [trip, setTrip] = useState({})
    const [newTrip, setNewTrip] = useState({})
    const handleClick = () => setIsPublic(!is_public)
    const handleHomePageTrip = () => setHomePageTrip(!homepage_trip)

    const onSubmitHandler = e => {
        const trip = {
            title: title.current.value,
            description: description.current.value,
            trip_length: trip_length.current.value,
            start_date: start_date.current.value,
            end_date: end_date.current.value,
            is_public: is_public,
            homepage_trip: homepage_trip
        }
        apiManager.postObj('trips', trip).then(trip => {
            setNewTrip(trip)
            toggle()
        })
    }

    const editTrip = () => {
        const trip = {
            id: props.tripId,
            title: title.current.value,
            description: description.current.value,
            trip_length: trip_length.current.value,
            start_date: start_date.current.value,
            end_date: end_date.current.value,
            is_public: is_public,
            homepage_trip: homepage_trip
        }
        apiManager.putObj('trips', trip)
        props.history.push(`/trips/${props.tripId}`)
    }

    useEffect(() => {
        if(props.tripId){
            apiManager.getById('trips', props.tripId).then(obj => {
                apiManager.getTraveler().then(user => {
                    if(user[0].id !== obj.creator_id) return props.history.push('/')
                    setTrip(obj)
                })
            })
        }
    },[props.tripId, props.history])

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    }

    async function createForEachDay() {
        for (let i = 0; i < newTrip.trip_length; i++) {
            const day_itinerary = {
                name: `Day ${i + 1}`,
                description: `Day ${i + 1} of ${newTrip.title}`,
                trip_id: newTrip.id
            }   
            try {
                await apiManager.postDayItinerary(day_itinerary)
            } catch (error) {
                console.error(error.message)
            }
        }
        toggle()
        props.history.push(`/trips/${newTrip.id}`)
    }

    async function createForEachActivity() {
        const day_itinerary_arr = [
            {title: 'Food', description: `Food to try while on trip`}, 
            {title: 'Lodging', description: `Places to stay while on trip`}, 
            {title: 'Activity', description: `Things to do while on trip`}, 
            {title: 'Transportation', description: `How to get around while on trip`}
        ]
        for (let i = 0; i < day_itinerary_arr.length; i++) {
            const day_itinerary = {
                name: day_itinerary_arr[i].title,
                description: day_itinerary_arr[i].description,
                trip_id: newTrip.id
            }   
            try {
                await apiManager.postDayItinerary(day_itinerary)
            } catch (error) {
                console.error(error.message)
            }
        }
        toggle()
        props.history.push(`/trips/${newTrip.id}`)
    }



    return (
        <>
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
                        <label htmlFor="homepage_trip"> Display Trip On Homepage? </label>
                        <input onChange={handleHomePageTrip} type="checkbox"
                            name="homepage_trip"
                            className="form-control"
                            placeholder="homepage_trip"
                            defaultValue={trip.homepage_trip}
                        />
                    </fieldset>
                    <fieldset>
                        {
                            props.tripId ?
                            <button type="button" onClick={editTrip}>
                                Update Trip
                            </button>
                            :
                            <>
                                <button type="button" onClick={onSubmitHandler}>
                                    Create Trip
                                </button>
                            </>
                        }
                    </fieldset>
                </form>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Would you like to plan out each day for your trip?</ModalHeader>
                    <form>
                        <div>
                            <button type="button" onClick={createForEachDay}>Yes</button>
                            <button type="button" onClick={createForEachActivity}>No</button>
                        </div>
                    </form>
                </Modal>
            </main>
        </>
    )
}