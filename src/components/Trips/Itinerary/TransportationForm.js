import React, { useEffect, useRef, useState } from 'react';
import apiManager from '../../../modules/apiManager';

export default function TransportationForm(props) {

    const name = useRef()
    const notes = useRef()
    const cost = useRef()
    const dep_datetime = useRef()
    const datetime = useRef()
    const dep_info = useRef()
    const arr_info = useRef()
    const [ dayItinerary, setDayItinerary ] = useState({})
    const [ itinerary, setItinerary ] = useState([])
    const [ oldTransportation, setTransportation ] = useState({day_itinerary: {}})

    const onSubmitHandler = e => {
        const transportation = {
            name: name.current.value,
            notes: notes.current.value,
            cost: cost.current.value,
            dep_datetime: dep_datetime.current.value,
            datetime: datetime.current.value,
            dep_info: dep_info.current.value,
            arr_info: arr_info.current.value,
            day_itinerary_id: dayItinerary.id
        }
        apiManager.postObj('transportations', transportation)
        props.history.push(`/trips/${props.tripId}`)
    }

    const editTransportation = (oldTransportation) => {
        if (!dayItinerary.id) dayItinerary.id = oldTransportation.day_itinerary_id
        const transportation = {
            id: props.transportationId,
            name: name.current.value,
            notes: notes.current.value,
            cost: cost.current.value,
            dep_datetime: dep_datetime.current.value,
            datetime: datetime.current.value,
            dep_info: dep_info.current.value,
            arr_info: arr_info.current.value,
            day_itinerary_id: dayItinerary.id
        }
        apiManager.putObj('transportations', transportation)
        props.history.push(`/trips/${props.tripId}`)
    }

    const getItinerary = () => {
        apiManager.getItinerary(props.tripId).then(setItinerary)
    }

    const handleChange = e => {
        const stateToChange = {...dayItinerary}
        stateToChange[e.target.id] = e.target.value
        const itinerary_day = itinerary.filter(day_itinerary => day_itinerary.name === stateToChange[e.target.id])
        setDayItinerary(itinerary_day[0])
    }

    useEffect(getItinerary, [])
    useEffect(() => {
        if(props.transportationId){
            apiManager.getById('transportations', props.transportationId).then(obj => {
                obj.datetime = obj.datetime.slice(0, 16)
                obj.dep_datetime = obj.dep_datetime.slice(0, 16)
                setTransportation(obj)
            })
        }
    },[props.transportationId])

    return (
         <main>
            <form>
                <h1>Transportation Form</h1>
                <fieldset>
                    <label htmlFor="name"> Name </label>
                    <input ref={name} type="text"
                        name="name"
                        className="form-control"
                        placeholder="name"
                        defaultValue={oldTransportation.name || ''}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="notes"> Notes </label>
                    <input ref={notes} type="text"
                        name="notes"
                        className="form-control"
                        placeholder="notes"
                        defaultValue={oldTransportation.notes || ''}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="cost"> Cost </label>
                    <input ref={cost} type="number"
                        name="cost"
                        className="form-control"
                        placeholder="cost"
                        defaultValue={oldTransportation.cost || ''}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="dep_datetime"> Departure Date </label>
                    <input ref={dep_datetime} type="datetime-local"
                        name="dep_datetime"
                        className="form-control"
                        defaultValue={oldTransportation.dep_datetime || ''}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="dep_info"> Departure Info </label>
                    <input ref={dep_info} type="text"
                        name="dep_info"
                        className="form-control"
                        placeholder="dep_info"
                        defaultValue={oldTransportation.dep_info || ''}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="datetime"> Arrival Date </label>
                    <input ref={datetime} type="datetime-local"
                        name="datetime"
                        className="form-control"
                        placeholder="datetime"
                        defaultValue={oldTransportation.datetime || ""}
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="arr_info"> Arrival Info </label>
                    <input ref={arr_info} type="text"
                        name="arr_info"
                        className="form-control"
                        placeholder="arr_info"
                        defaultValue={oldTransportation.arr_info || ''}
                        required />
                </fieldset>
                <fieldset>
                    <select required onChange={handleChange} id="day_itinerary">
                        <option>{oldTransportation.day_itinerary.name || 'Select Itinerary Day'}</option>
                        {itinerary.map(day_itinerary => <option key={day_itinerary.id}>{day_itinerary.name}</option>)}
                    </select>
                </fieldset>
                <fieldset>
                    {props.transportationId ? 
                        <button type="button" onClick={() => editTransportation(oldTransportation)}>
                            Update Transportation
                        </button>
                        :
                        <button type="button" onClick={onSubmitHandler}>
                            Add Transportation
                        </button>
                    }
                </fieldset>
            </form>
        </main>
    )
}