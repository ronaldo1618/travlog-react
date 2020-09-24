import React, { useEffect, useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import apiManager from '../../../modules/apiManager';

export default function ActivityForm(props) {

    const name = useRef()
    const notes = useRef()
    const [cost, setCost] = useState(0)
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
        let price = cost
        if (cost === '') price = 0
        const activity = {
            name: name.current.value,
            notes: notes.current.value,
            cost: price,
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
            cost: cost,
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
                setCost(obj.cost)
                setActivity(obj)
            })
        }
    },[props.activityId])

    return (
         <div className="form-container">
            {/* <div>
                <Form.Control ref={searchValue} type="text"
                    name="search"
                    placeholder="search"/>
                <Form.Control ref={city} type="text"
                    name="search"
                    placeholder="search"/>
                <button type="button" onClick={search}/>
            </div> */}
            <Form className="form">
                <h1>Activity Form</h1>
                <Form.Group>
                    {/* <Form.Label htmlFor="name"> Name </Form.Label> */}
                    <Form.Control ref={name} type="text"
                        name="name"
                        className="form-control"
                        placeholder="name"
                        defaultValue={oldActivity.name || ''}
                        required />
                </Form.Group>
                <Form.Group>
                    {/* <Form.Label htmlFor="notes"> Notes </Form.Label> */}
                    <Form.Control ref={notes} type="text"
                        name="notes"
                        className="form-control"
                        placeholder="notes"
                        defaultValue={oldActivity.notes || ''}
                        required />
                </Form.Group>
                <Form.Group>
                    {/* <Form.Label htmlFor="cost"> Cost </Form.Label> */}
                    <Form.Control onChange={e => setCost(e.target.value)} type="number"
                        name="cost"
                        className="form-control"
                        placeholder="cost"
                        value={cost || 'cost'}
                        required />
                </Form.Group>
                <Form.Group>
                    {/* <Form.Label htmlFor="address"> Address </Form.Label> */}
                    <Form.Control ref={address} type="text"
                        name="address"
                        className="form-control"
                        placeholder="address"
                        defaultValue={oldActivity.address || ''}
                        required />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="datetime"> Arrival Date </Form.Label>
                    <Form.Control ref={datetime} type="datetime-local"
                        name="datetime"
                        className="form-control"
                        placeholder="datetime"
                        defaultValue={oldActivity.datetime || ""}
                    />
                </Form.Group>
                <Form.Group>
                    <select required onChange={handleChange} id="day_itinerary">
                        <option>{oldActivity.day_itinerary.name || 'Select Itinerary Category'}</option>
                        {itinerary.map(day_itinerary => <option key={day_itinerary.id}>{day_itinerary.name}</option>)}
                    </select>
                </Form.Group>
                <Form.Group>
                    {props.activityId ? 
                        <Button type="button" onClick={() => editActivity(oldActivity)}>
                            Update Activity
                        </Button>
                        :
                        <Button type="button" onClick={onSubmitHandler}>
                            Add Activity
                        </Button>
                    }
                    <Button type="button" onClick={() => props.history.push(`/trips/${props.tripId}`)}>Cancel</Button>
                </Form.Group>
            </Form>
        </div>
    )
}