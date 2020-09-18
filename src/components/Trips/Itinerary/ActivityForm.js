import React, { useEffect, useRef, useState } from 'react';
import apiManager from '../../../modules/apiManager';

export default function ActivityForm(props) {

    const name = useRef()
    const notes = useRef()
    const cost = useRef()
    const address = useRef()
    const datetime = useRef()
    // const searchValue = useRef()
    // const city = useRef()
    const [ dayItinerary, setDayItinerary ] = useState({})
    const [ itinerary, setItinerary ] = useState([])
    const [ oldActivity, setActivity ] = useState({day_itinerary: {}})

    const onSubmitHandler = e => {
        if (name.current.value === '') return alert('Please fill out the name field!')
        if (datetime.current.value === '') datetime.current.value = new Date().toISOString().slice(0, 16)
        const activity = {
            name: name.current.value,
            notes: notes.current.value,
            cost: cost.current.value,
            address: address.current.value,
            datetime: datetime.current.value,
            day_itinerary_id: dayItinerary.id
        }
        apiManager.postObj('activitys', activity)
        props.history.push(`/trips/${props.tripId}`)
    }

    const editActivity = (oldActivity) => {
        if (name.current.value === '') return alert('Please fill out the name field!')
        if (datetime.current.value === '') datetime.current.value = new Date().toISOString().slice(0, 16)
        if (!dayItinerary.id) dayItinerary.id = oldActivity.day_itinerary_id
        const activity = {
            id: props.activityId,
            name: name.current.value,
            notes: notes.current.value,
            cost: cost.current.value,
            address: address.current.value,
            datetime: datetime.current.value,
            day_itinerary_id: dayItinerary.id
        }
        apiManager.putObj('activitys', activity)
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

    // const search = () => {
    //     apiManager.search(city.current.value, searchValue.current.value).then(result => {
    //         console.log(result)
    //     })
    // }

    useEffect(getItinerary, [])
    useEffect(() => {
        if(props.activityId){
            apiManager.getById('activitys', props.activityId).then(obj => {
                obj.datetime = obj.datetime.slice(0, 16)
                setActivity(obj)
            })
        }
    },[props.activityId])

    return (
         <main>
            {/* <div>
                <input ref={searchValue} type="text"
                    name="search"
                    placeholder="search"/>
                <input ref={city} type="text"
                    name="search"
                    placeholder="search"/>
                <button type="button" onClick={search}/>
            </div> */}
            <form>
                <h1>Activity Form</h1>
                <fieldset>
                    <label htmlFor="name"> Name </label>
                    <input ref={name} type="text"
                        name="name"
                        className="form-control"
                        placeholder="name"
                        defaultValue={oldActivity.name || ''}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="notes"> Notes </label>
                    <input ref={notes} type="text"
                        name="notes"
                        className="form-control"
                        placeholder="notes"
                        defaultValue={oldActivity.notes || ''}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="cost"> Cost </label>
                    <input ref={cost} type="number"
                        name="cost"
                        className="form-control"
                        placeholder="cost"
                        defaultValue={oldActivity.cost || 0}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="address"> Address </label>
                    <input ref={address} type="text"
                        name="address"
                        className="form-control"
                        defaultValue={oldActivity.address || ''}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="datetime"> Arrival Date </label>
                    <input ref={datetime} type="datetime-local"
                        name="datetime"
                        className="form-control"
                        placeholder="datetime"
                        defaultValue={oldActivity.datetime || ""}
                    />
                </fieldset>
                <fieldset>
                    <select required onChange={handleChange} id="day_itinerary">
                        <option>{oldActivity.day_itinerary.name || 'Select Itinerary Category'}</option>
                        {itinerary.map(day_itinerary => <option key={day_itinerary.id}>{day_itinerary.name}</option>)}
                    </select>
                </fieldset>
                <fieldset>
                    {props.activityId ? 
                        <button type="button" onClick={() => editActivity(oldActivity)}>
                            Update Activity
                        </button>
                        :
                        <button type="button" onClick={onSubmitHandler}>
                            Add Activity
                        </button>
                    }
                </fieldset>
            </form>
        </main>
    )
}