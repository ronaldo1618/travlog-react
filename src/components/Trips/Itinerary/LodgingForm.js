import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import apiManager from '../../../modules/apiManager';

export default function LodgingForm(props) {

    const name = useRef()
    const notes = useRef()
    const [cost, setCost] = useState(0)
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
            cost: cost,
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
            cost: cost,
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
                setCost(obj.cost)
                setLodging(obj)
            })
        }
    },[props.lodgingId])

    return (
         <div className="register-container">
            <Form className="login-box effect-shadow">
                <h1>Lodging Form</h1>
                <Form.Group>
                    <Form.Control ref={name} type="text"
                        name="name"
                        className="form-control"
                        placeholder="name"
                        defaultValue={oldLodging.name || ''}
                        required />
                </Form.Group>
                <Form.Group>
                    <Form.Control ref={notes} type="text"
                        name="notes"
                        className="form-control"
                        placeholder="notes"
                        defaultValue={oldLodging.notes || ''}
                        required />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Control onChange={e => setCost(e.target.value)} type="number"
                            name="cost"
                            className="form-control"
                            placeholder="cost"
                            value={cost || 'cost'}
                            required />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control ref={phone_number} type="text"
                            name="phone_number"
                            className="form-control"
                            placeholder="phone-number"
                            defaultValue={oldLodging.phone_number || ''}
                            required />
                    </Form.Group>
                </Form.Row>
                <Form.Group>
                    <Form.Control ref={address} type="text"
                        name="address"
                        className="form-control"
                        placeholder="address"
                        defaultValue={oldLodging.address || ''}
                        required />
                </Form.Group>
                <Form.Group>
                    <Form.Control ref={website} type="text"
                        name="website"
                        className="form-control"
                        placeholder="website"
                        defaultValue={oldLodging.website || ''}
                        required />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="check_in"> Check In </Form.Label>
                        <Form.Control ref={check_in} type="datetime-local"
                            name="check_in"
                            className="form-control"
                            placeholder="check-in"
                            defaultValue={oldLodging.check_in || ""}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="datetime"> Check Out </Form.Label>
                        <Form.Control ref={datetime} type="datetime-local"
                            name="datetime"
                            className="form-control"
                            placeholder="check-out"
                            defaultValue={oldLodging.datetime || ""}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Group>
                    <select required onChange={handleChange} id="day_itinerary">
                        <option>{oldLodging.day_itinerary.name || 'Select Itinerary Category'}</option>
                        {itinerary.map(day_itinerary => <option key={day_itinerary.id}>{day_itinerary.name}</option>)}
                    </select>
                </Form.Group>
                <Form.Group>
                    {props.lodgingId ? 
                        <Button type="button" onClick={() => editLodging(oldLodging)}>
                            Update Lodging
                        </Button>
                        :
                        <Button type="button" onClick={onSubmitHandler}>
                            Add Lodging
                        </Button>
                    }
                    <Button variant="outline-danger" className="outline-dngr-btn" type="button" onClick={() => props.history.push(`/trips/${props.tripId}`)}>Cancel</Button>
                </Form.Group>
            </Form>
        </div>
    )
}