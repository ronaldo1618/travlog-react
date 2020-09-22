import React from 'react';
import { Card } from 'react-bootstrap';
import '../Trip.css';


export default function ItineraryCard(props) {

    const type = props.activity.url.split('8000/')[1].split('/')[0]

    return (
        <>
            {type === 'transportations' ? 
                <Card className="itin-card" style={{ width: '18rem'}}>
                    <Card.Header>Transportation Icon</Card.Header>
                    <Card.Body>
                    <Card.Text>Name: {props.activity.name}</Card.Text>
                    <Card.Text>Notes: {props.activity.notes}</Card.Text>
                    <Card.Text>Cost: ${props.activity.cost}</Card.Text>
                    <Card.Text>Departure Date: {props.activity.dep_datetime.slice(0, 10)}</Card.Text>
                    <Card.Text>Departure Info: {props.activity.dep_info}</Card.Text>
                    <Card.Text>Arrival Date: {props.activity.datetime.slice(0, 10)}</Card.Text>
                    <Card.Text>Arrival Info: {props.activity.arr_info}</Card.Text>
                    {props.userId === props.creatorId ?
                        <>
                            <button type='button' onClick={() => props.deleteObj(type, props.activity.id)}>Delete</button>
                            <button type='button' onClick={() => props.history.push(`/transportations/form/${props.tripId}/${props.activity.id}`)}>Edit</button>
                        </>
                        :
                        null
                    }
                    </Card.Body>
                </Card>
            : null
            }
            {type === 'activitys' ? 
                <Card className="itin-card" style={{ width: '18rem'}}>
                    <Card.Header>Activity Icon</Card.Header>
                    <Card.Body>
                    <Card.Text>Name: {props.activity.name}</Card.Text>
                    <Card.Text>Notes: {props.activity.notes}</Card.Text>
                    <Card.Text>Cost: ${props.activity.cost}</Card.Text>
                    <Card.Text>Address: {props.activity.address}</Card.Text>
                    <Card.Text>Date: {props.activity.datetime.slice(0, 10)}</Card.Text>
                    {props.userId === props.creatorId ?
                        <>
                            <button type='button' onClick={() => props.deleteObj(type, props.activity.id)}>Delete</button>
                            <button type='button' onClick={() => props.history.push(`/activitys/form/${props.tripId}/${props.activity.id}`)}>Edit</button>
                        </>
                        :
                        null
                    }
                    </Card.Body>
                </Card>
            : null
            }
            {type === 'foods' ? 
                <Card className="itin-card" style={{ width: '18rem'}}>
                    <Card.Header>Food Icon</Card.Header>
                    <Card.Body>

                    <Card.Text>Name: {props.activity.name}</Card.Text>
                    <Card.Text>Notes: {props.activity.notes}</Card.Text>
                    <Card.Text>Cost: ${props.activity.cost}</Card.Text>
                    <Card.Text>Address: {props.activity.address}</Card.Text>
                    <Card.Text>Date: {props.activity.datetime.slice(0, 10)}</Card.Text>
                    {props.userId === props.creatorId ?
                        <>
                            <button type='button' onClick={() => props.deleteObj(type, props.activity.id)}>Delete</button>
                            <button type='button' onClick={() => props.history.push(`/foods/form/${props.tripId}/${props.activity.id}`)}>Edit</button>
                        </>
                        :
                        null
                    }
                    </Card.Body>
                </Card>
            : null
            }
            {type === 'lodgings' ? 
                <Card className="itin-card" style={{ width: '18rem'}}>
                    <Card.Header>Lodging Icon</Card.Header>
                    <Card.Body>

                    <Card.Text>Name: {props.activity.name}</Card.Text>
                    <Card.Text>Notes: {props.activity.notes}</Card.Text>
                    <Card.Text>Cost: ${props.activity.cost}</Card.Text>
                    <Card.Text>Address: {props.activity.address}</Card.Text>
                    <Card.Text>Check-in: {props.activity.check_in.slice(0, 10)}</Card.Text>
                    <Card.Text>Check-out: {props.activity.datetime.slice(0, 10)}</Card.Text>
                    <Card.Text>Phone-number: {props.activity.phone_number}</Card.Text>
                    <a rel="noopener noreferrer" href={props.activity.website} target="_blank">{props.activity.website}</a>
                    <Card.Text>Address: {props.activity.address}</Card.Text>
                    {props.userId === props.creatorId ?
                        <>
                            <button type='button' onClick={() => props.deleteObj(type, props.activity.id)}>Delete</button>
                            <button type='button' onClick={() => props.history.push(`/lodgings/form/${props.tripId}/${props.activity.id}`)}>Edit</button>
                        </>
                        :
                        null
                    }
                    </Card.Body>
                </Card>
            : null
            }
            <hr/>
        </>
    )
}