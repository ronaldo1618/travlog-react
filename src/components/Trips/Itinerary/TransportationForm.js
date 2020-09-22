import React, { useEffect, useRef, useState } from 'react';
import apiManager from '../../../modules/apiManager';
import { Form, Col, Button} from 'react-bootstrap';

export default function TransportationForm(props) {


    const name = useRef()
    const notes = useRef()
    const [cost, setCost] = useState(0)
    const dep_datetime = useRef()
    const datetime = useRef()
    // const dep_info = useRef()
    // const arr_info = useRef()
    const [ dayItinerary, setDayItinerary ] = useState({})
    const [ itinerary, setItinerary ] = useState([])
    const [ oldTransportation, setTransportation ] = useState({day_itinerary: {}})

    const onSubmitHandler = e => {
        console.log(name.current.value)
        if (name.current.value === '') return alert('Please fill out the name field!')
        if (!dayItinerary.id) return alert('Please select a day itinerary!')
        if (dep_datetime.current.value === '') dep_datetime.current.value = new Date().toISOString().slice(0, 16)
        if (datetime.current.value === '') datetime.current.value = new Date().toISOString().slice(0, 16)
        const transportation = {
            name: name.current.value,
            notes: notes.current.value,
            cost: cost,
            dep_datetime: dep_datetime.current.value,
            datetime: datetime.current.value,
            // dep_info: dep_info.current.value,
            // arr_info: arr_info.current.value,
            day_itinerary_id: dayItinerary.id
        }
        apiManager.postObj('transportations', transportation)
        props.history.push(`/trips/${props.tripId}`)
    }

    const editTransportation = (oldTransportation) => {
        if (!dayItinerary.id) dayItinerary.id = oldTransportation.day_itinerary_id
        if (name.current.value === '') return alert('Please fill out the name field!')
        if (!dayItinerary.id) return alert('Please select a day itinerary!')
        if (dep_datetime.current.value === '') dep_datetime.current.value = new Date().toISOString().slice(0, 16)
        if (datetime.current.value === '') datetime.current.value = new Date().toISOString().slice(0, 16)
        const transportation = {
            id: props.transportationId,
            name: name.current.value,
            notes: notes.current.value,
            cost: cost,
            dep_datetime: dep_datetime.current.value,
            datetime: datetime.current.value,
            // dep_info: dep_info.current.value,
            // arr_info: arr_info.current.value,
            day_itinerary_id: dayItinerary.id
        }
        apiManager.putObj('transportations', transportation)
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

    const handleCost = e => {
        setCost(e.target.value)
    }

    useEffect(getItinerary, [])
    useEffect(() => {
        if(props.transportationId){
            apiManager.getById('transportations', props.transportationId).then(obj => {
                obj.datetime = obj.datetime.slice(0, 16)
                obj.dep_datetime = obj.dep_datetime.slice(0, 16)
                setCost(obj.cost)
                setTransportation(obj)
            })
        }
    },[props.transportationId])

    return (
         <div className="register-container">
            <Form className="login-box">
                <h1>Transportation Form</h1>
                <Form.Group>
                    {/* <Form.Label htmlFor="name"> Name </Form.Label> */}
                    <Form.Control ref={name} type="text"
                        name="name"
                        className="form-control"
                        placeholder="name"
                        defaultValue={oldTransportation.name || ''}
                        required autoFocus/>
                </Form.Group>
                {/* <Form.Group>
                    <Form.Label htmlFor="notes"> Notes </Form.Label>
                    <Form.Control ref={notes} type="text"
                        name="notes"
                        className="form-control"
                        placeholder="notes"
                        defaultValue={oldTransportation.notes || ''}
                        required />
                </Form.Group> */}
                <Form.Group>
                    <Form.Label htmlFor="cost"> Cost </Form.Label>
                    <Form.Control onChange={handleCost} type="number"
                        name="cost"
                        className="form-control"
                        placeholder="cost"
                        value={cost || 'cost'}
                        required />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="dep_datetime"> Departure Date </Form.Label>
                        <Form.Control ref={dep_datetime} type="datetime-local"
                            name="dep_datetime"
                            className="form-control"
                            defaultValue={oldTransportation.dep_datetime || 'yyyy-mm-dd'}
                            required />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="datetime"> Arrival Date </Form.Label>
                        <Form.Control ref={datetime} type="datetime-local"
                            name="datetime"
                            className="form-control"
                            placeholder="datetime"
                            defaultValue={oldTransportation.datetime || ""}
                        />
                    </Form.Group>
                </Form.Row>
                {/* <Form.Group>
                    <Form.Label htmlFor="dep_info"> Departure Info </Form.Label>
                    <Form.Control ref={dep_info} as="textarea"
                        rows={3}
                        name="dep_info"
                        className="form-control"
                        placeholder="departure info"
                        defaultValue={oldTransportation.dep_info || ''}
                        required />
                </Form.Group> */}
                <Form.Group>
                    {/* <Form.Label htmlFor="arr_info"> Arrival Info </Form.Label> */}
                    <Form.Control ref={notes} as="textarea"
                        rows={3}
                        name="arr_info"
                        className="form-control"
                        placeholder="arrival info or departure info"
                        defaultValue={oldTransportation.arr_info || ''}
                        required />
                </Form.Group>
                <Form.Group>
                    <select required onChange={handleChange} id="day_itinerary">
                        <option>{oldTransportation.day_itinerary.name || 'Select Itinerary Category'}</option>
                        {itinerary.map(day_itinerary => <option key={day_itinerary.id}>{day_itinerary.name}</option>)}
                    </select>
                </Form.Group>
                <Form.Group>
                    {props.transportationId ? 
                        <Button type="button" onClick={() => editTransportation(oldTransportation)}>
                            Update Transportation
                        </Button>
                        :
                        <Button type="button" onClick={onSubmitHandler}>
                            Add Transportation
                        </Button>
                    }
                </Form.Group>
            </Form>
        </div>
    )
}