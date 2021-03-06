import React, { useRef, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import apiManager from '../../modules/apiManager';

export default function DayItineraryForm(props) {

    const name = useRef()
    const description = useRef()
    const [day_itinerary, setDayItinerary] = useState({})

    const onSubmitHandler = e => {
        if (name.current.value === '') return alert('Please fill out the name field!')
        if (description.current.value === '') return alert('Please fill out the description field!')
        const day_itinerary = {
            name: name.current.value,
            description: description.current.value,
            trip_id: props.tripId
        }
        apiManager.postObj('day_itinerarys', day_itinerary).then(() => props.history.push(`/trips/${props.tripId}`))
    }

    const editDayItinerary = () => {
        if (name.current.value === '') return alert('Please fill out the name field!')
        if (description.current.value === '') return alert('Please fill out the description field!')
        const day_itinerary = {
            id: props.day_itinerary_id,
            name: name.current.value,
            description: description.current.value,
            trip_id: props.tripId
        }
        apiManager.putObj('day_itinerarys', day_itinerary)
        props.history.push(`/trips/${props.tripId}`)
    }

    useEffect(() => {
        if(props.day_itinerary_id){
            apiManager.getById('day_itinerarys', props.day_itinerary_id).then(obj => {
                setDayItinerary(obj)
            })
        }
    },[props.transportationId, props.day_itinerary_id])

    return (
         <div className="form-container">
            <img className="img-bkgrnd" alt="" src='https://res.cloudinary.com/ddxpoaice/image/upload/v1601266397/travlog/kg1moejl15jps7kz0mha.jpg'/>
            <Form className="form">
                <h3>Itinerary Category Form</h3>
                <Form.Group>
                    <Form.Control ref={name} type="text"
                        name="name"
                        className="form-control"
                        placeholder="name"
                        defaultValue={day_itinerary.name}
                        required autoFocus />
                </Form.Group>
                <Form.Group>
                    <Form.Control ref={description} type="text"
                        name="description"
                        className="form-control"
                        placeholder="description"
                        defaultValue={day_itinerary.description}
                        required autoFocus />
                </Form.Group>
                <Form.Group>
                    {props.day_itinerary_id ? 
                        <Button type="button" onClick={editDayItinerary}>
                            Update Category
                        </Button>
                        :
                        <Button type="button" onClick={onSubmitHandler}>
                            Create Category
                        </Button>
                    }
                    <Button variant="outline-danger" className="outline-dngr-btn" type="button" onClick={() => props.history.push(`/trips/${props.tripId}`)}>Cancel</Button>
                </Form.Group>
            </Form>
        </div>
    )
}