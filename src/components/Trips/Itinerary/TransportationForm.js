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
    const [ transportation, setTransportation ] = useState({day_itinerary: {}})

    const onSubmitHandler = e => {
        console.log(dayItinerary)
        console.log(dep_datetime.current.value)
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
        apiManager.postTransportation(transportation)
        props.history.push(`/trips/${props.tripId}`)
    }

    const getItinerary = () => {
        apiManager.getItinerary(props.tripId).then(setItinerary)
    }

    console.log(props)

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
                console.log(obj)
                obj.datetime = obj.datetime.split('Z')[0]
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
                        defaultValue={transportation.name || ''}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="notes"> Notes </label>
                    <input ref={notes} type="text"
                        name="notes"
                        className="form-control"
                        placeholder="notes"
                        defaultValue={transportation.notes || ''}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="cost"> Cost </label>
                    <input ref={cost} type="number"
                        name="cost"
                        className="form-control"
                        placeholder="cost"
                        defaultValue={transportation.cost || ''}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="dep_datetime"> Departure Date </label>
                    <input ref={dep_datetime} type="datetime-local"
                        name="dep_datetime"
                        className="form-control"
                        defaultValue={transportation.dep_datetime || ''}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="dep_info"> Departure Info </label>
                    <input ref={dep_info} type="text"
                        name="dep_info"
                        className="form-control"
                        placeholder="dep_info"
                        defaultValue={transportation.dep_info || ''}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="datetime"> Arrival Date </label>
                    <input ref={datetime} type="datetime-local"
                        name="datetime"
                        className="form-control"
                        placeholder="datetime"
                        defaultValue={transportation.datetime || ""}
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="arr_info"> Arrival Info </label>
                    <input ref={arr_info} type="text"
                        name="arr_info"
                        className="form-control"
                        placeholder="arr_info"
                        defaultValue={transportation.arr_info || ''}
                        required />
                </fieldset>
                <fieldset>
                    <select required onChange={handleChange} id="day_itinerary">
                        <option>{transportation.day_itinerary.name || 'Select Itinerary Day'}</option>
                        {itinerary.map(day_itinerary => <option key={day_itinerary.id}>{day_itinerary.name}</option>)}
                    </select>
                </fieldset>
                <fieldset>
                    <button type="button" onClick={onSubmitHandler}>
                        Add Transportation
                    </button>
                </fieldset>
            </form>
        </main>
    )
}