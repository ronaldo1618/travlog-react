import React, { useEffect, useRef, useState } from 'react';
import apiManager from '../../../modules/apiManager';

export default function LodgingForm(props) {

    const name = useRef()
    const notes = useRef()
    const cost = useRef()
    const address = useRef() 
    const website = useRef()
    const phone_number = useRef()
    const datetime = useRef()
    const check_in = useRef()
    const [ dayItinerary, setDayItinerary ] = useState({})
    const [ itinerary, setItinerary ] = useState([])
    const [ oldLodging, setLodging ] = useState({day_itinerary: {}})

    const onSubmitHandler = e => {
        if (name.current.value === '') return alert('Please fill out the name field!')
        if (datetime.current.value === '') datetime.current.value = new Date().toISOString().slice(0, 16)
        if (check_in.current.value === '') check_in.current.value = new Date().toISOString().slice(0, 16)
        const lodging = {
            name: name.current.value,
            notes: notes.current.value,
            cost: cost.current.value,
            address: address.current.value,
            datetime: datetime.current.value,
            check_in: check_in.current.value,
            website: website.current.value,
            phone_number: phone_number.current.value,
            day_itinerary_id: dayItinerary.id
        }
        apiManager.postObj('lodgings', lodging)
        props.history.push(`/trips/${props.tripId}`)
    }

    const editLodging = (oldLodging) => {
        if (name.current.value === '') return alert('Please fill out the name field!')
        if (datetime.current.value === '') datetime.current.value = new Date().toISOString().slice(0, 16)
        if (check_in.current.value === '') check_in.current.value = new Date().toISOString().slice(0, 16)
        if (!dayItinerary.id) dayItinerary.id = oldLodging.day_itinerary_id
        const lodging = {
            id: props.lodgingId,
            name: name.current.value,
            notes: notes.current.value,
            cost: cost.current.value,
            address: address.current.value,
            datetime: datetime.current.value,
            check_in: check_in.current.value,
            website: website.current.value,
            phone_number: phone_number.current.value,
            day_itinerary_id: dayItinerary.id
        }
        apiManager.putObj('lodgings', lodging)
        props.history.push(`/trips/${props.tripId}`)
    }

    const getItinerary = () => {
        apiManager.getItinerary(props.tripId).then(itinerary => {
            if (itinerary.length === 0) {
                const day_itinerary = {
                    name: 'Day 1',
                    description: 'Dont forget to add a description!',
                    trip_id: props.tripId
                }
                apiManager.postObj('day_itinerarys', day_itinerary).then(itinerary => {
                    setItinerary([itinerary])
                })
            }
            else {
                setItinerary(itinerary)
            }
        })
    }

    const handleChange = e => {
        const stateToChange = {...dayItinerary}
        stateToChange[e.target.id] = e.target.value
        const itinerary_day = itinerary.filter(day_itinerary => day_itinerary.name === stateToChange[e.target.id])
        setDayItinerary(itinerary_day[0])
    }

    useEffect(getItinerary, [])
    useEffect(() => {
        if(props.lodgingId){
            apiManager.getById('lodgings', props.lodgingId).then(obj => {
                obj.datetime = obj.datetime.slice(0, 16)
                obj.check_in = obj.check_in.slice(0, 16)
                setLodging(obj)
            })
        }
    },[props.lodgingId])

    return (
         <main>
            <form>
                <h1>Lodging Form</h1>
                <fieldset>
                    <label htmlFor="name"> Name </label>
                    <input ref={name} type="text"
                        name="name"
                        className="form-control"
                        placeholder="name"
                        defaultValue={oldLodging.name || ''}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="notes"> Notes </label>
                    <input ref={notes} type="text"
                        name="notes"
                        className="form-control"
                        placeholder="notes"
                        defaultValue={oldLodging.notes || ''}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="cost"> Cost </label>
                    <input ref={cost} type="number"
                        name="cost"
                        className="form-control"
                        placeholder="cost"
                        defaultValue={oldLodging.cost || 0}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="address"> Address </label>
                    <input ref={address} type="text"
                        name="address"
                        className="form-control"
                        defaultValue={oldLodging.address || ''}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="phone_number"> Phone Number </label>
                    <input ref={phone_number} type="text"
                        name="phone_number"
                        className="form-control"
                        defaultValue={oldLodging.phone_number || ''}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="website"> Website </label>
                    <input ref={website} type="text"
                        name="website"
                        className="form-control"
                        defaultValue={oldLodging.website || ''}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="check_in"> Check In </label>
                    <input ref={check_in} type="datetime-local"
                        name="check_in"
                        className="form-control"
                        placeholder="check-in"
                        defaultValue={oldLodging.check_in || ""}
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="datetime"> Check Out </label>
                    <input ref={datetime} type="datetime-local"
                        name="datetime"
                        className="form-control"
                        placeholder="check-out"
                        defaultValue={oldLodging.datetime || ""}
                    />
                </fieldset>
                <fieldset>
                    <select required onChange={handleChange} id="day_itinerary">
                        <option>{oldLodging.day_itinerary.name || 'Select Itinerary Category'}</option>
                        {itinerary.map(day_itinerary => <option key={day_itinerary.id}>{day_itinerary.name}</option>)}
                    </select>
                </fieldset>
                <fieldset>
                    {props.lodgingId ? 
                        <button type="button" onClick={() => editLodging(oldLodging)}>
                            Update Lodging
                        </button>
                        :
                        <button type="button" onClick={onSubmitHandler}>
                            Add Lodging
                        </button>
                    }
                </fieldset>
            </form>
        </main>
    )
}