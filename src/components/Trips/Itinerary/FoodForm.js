import React, { useEffect, useRef, useState } from 'react';
import apiManager from '../../../modules/apiManager';

export default function FoodForm(props) {

    const name = useRef()
    const notes = useRef()
    const cost = useRef()
    const address = useRef()
    const datetime = useRef()
    const [ dayItinerary, setDayItinerary ] = useState({})
    const [ itinerary, setItinerary ] = useState([])
    const [ oldFood, setFood ] = useState({day_itinerary: {}})

    const onSubmitHandler = e => {
        const food = {
            name: name.current.value,
            notes: notes.current.value,
            cost: cost.current.value,
            address: address.current.value,
            datetime: datetime.current.value,
            day_itinerary_id: dayItinerary.id
        }
        apiManager.postObj('foods', food)
        props.history.push(`/trips/${props.tripId}`)
    }

    const editFood = (oldFood) => {
        console.log(oldFood)
        if (!dayItinerary.id) dayItinerary.id = oldFood.day_itinerary_id
        const food = {
            id: props.foodId,
            name: name.current.value,
            notes: notes.current.value,
            cost: cost.current.value,
            address: address.current.value,
            datetime: datetime.current.value,
            day_itinerary_id: dayItinerary.id
        }
        apiManager.putObj('foods', food)
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
        if(props.foodId){
            apiManager.getById('foods', props.foodId).then(obj => {
                obj.datetime = obj.datetime.slice(0, 16)
                setFood(obj)
            })
        }
    },[props.foodId])

    return (
         <main>
            <form>
                <h1>Food Form</h1>
                <fieldset>
                    <label htmlFor="name"> Name </label>
                    <input ref={name} type="text"
                        name="name"
                        className="form-control"
                        placeholder="name"
                        defaultValue={oldFood.name || ''}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="notes"> Notes </label>
                    <input ref={notes} type="text"
                        name="notes"
                        className="form-control"
                        placeholder="notes"
                        defaultValue={oldFood.notes || ''}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="cost"> Cost </label>
                    <input ref={cost} type="number"
                        name="cost"
                        className="form-control"
                        placeholder="cost"
                        defaultValue={oldFood.cost || ''}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="address"> Address </label>
                    <input ref={address} type="text"
                        name="address"
                        className="form-control"
                        defaultValue={oldFood.address || ''}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="datetime"> Arrival Date </label>
                    <input ref={datetime} type="datetime-local"
                        name="datetime"
                        className="form-control"
                        placeholder="datetime"
                        defaultValue={oldFood.datetime || ""}
                    />
                </fieldset>
                <fieldset>
                    <select required onChange={handleChange} id="day_itinerary">
                        <option>{oldFood.day_itinerary.name || 'Select Itinerary Day'}</option>
                        {itinerary.map(day_itinerary => <option key={day_itinerary.id}>{day_itinerary.name}</option>)}
                    </select>
                </fieldset>
                <fieldset>
                    {props.foodId ? 
                        <button type="button" onClick={() => editFood(oldFood)}>
                            Update Food
                        </button>
                        :
                        <button type="button" onClick={onSubmitHandler}>
                            Add Food
                        </button>
                    }
                </fieldset>
            </form>
        </main>
    )
}