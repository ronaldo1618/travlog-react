import React from 'react';
import { Card, Button } from 'react-bootstrap';
import moment from 'moment';
import '../Trip.css';


export default function ItineraryCard(props) {

    const type = props.activity.url.split('8000/')[1].split('/')[0]

    return (
        <div className="itin-card-container">
            {type === 'transportations' ? 
                <Card className="itin-card">
                    <Card.Header>Transportation Icon</Card.Header>
                    <Card.Body>
                    <Card.Text>{props.activity.name}</Card.Text>
                    <Card.Text>{props.activity.notes}</Card.Text>
                    <Card.Text>{props.activity.cost === 0 ? null : `$` + props.activity.cost}</Card.Text>
                    <Card.Text>Departure Date: {moment(props.activity.dep_datetime).format('MMM Do YYYY, h:mm a')}</Card.Text>
                    <Card.Text>Arrival Date: {moment(props.activity.datetime.slice(0, 10)).format('MMM Do YYYY, h:mm a')}</Card.Text>
                    {props.userId === props.creatorId ?
                        <>
                            <Button type='button' onClick={() => props.deleteObj(type, props.activity.id)}>Delete</Button>
                            <Button type='button' onClick={() => props.history.push(`/transportations/form/${props.tripId}/${props.activity.id}`)}>Edit</Button>
                        </>
                        :
                        null
                    }
                    </Card.Body>
                </Card>
            : null
            }
            {type === 'activitys' ? 
                <Card className="itin-card">
                    <Card.Header>Activity Icon</Card.Header>
                    <Card.Body>
                    <Card.Text>{props.activity.name}</Card.Text>
                    <Card.Text>{props.activity.notes}</Card.Text>
                    <Card.Text>{props.activity.cost === 0 ? null : `$` + props.activity.cost}</Card.Text>
                    <Card.Text>{props.activity.address}</Card.Text>
                    <Card.Text>{moment(props.activity.datetime.slice(0, 10), 'YYYY-MM-DD').format('MMM Do YYYY')}</Card.Text>
                    {props.userId === props.creatorId ?
                        <>
                            <Button type='button' onClick={() => props.deleteObj(type, props.activity.id)}>Delete</Button>
                            <Button type='button' onClick={() => props.history.push(`/activitys/form/${props.tripId}/${props.activity.id}`)}>Edit</Button>
                        </>
                        :
                        null
                    }
                    </Card.Body>
                </Card>
            : null
            }
            {type === 'foods' ? 
                <Card className="itin-card">
                    <Card.Header>Food Icon</Card.Header>
                    <Card.Body>

                    <Card.Text>{props.activity.name}</Card.Text>
                    <Card.Text>{props.activity.notes}</Card.Text>
                    <Card.Text>{props.activity.cost === 0 ? null : `$` + props.activity.cost}</Card.Text>
                    <Card.Text>{props.activity.address}</Card.Text>
                    <Card.Text>{moment(props.activity.datetime.slice(0, 10), 'YYYY-MM-DD').format('MMM Do YYYY')}</Card.Text>
                    {props.userId === props.creatorId ?
                        <>
                            <Button type='button' onClick={() => props.deleteObj(type, props.activity.id)}>Delete</Button>
                            <Button type='button' onClick={() => props.history.push(`/foods/form/${props.tripId}/${props.activity.id}`)}>Edit</Button>
                        </>
                        :
                        null
                    }
                    </Card.Body>
                </Card>
            : null
            }
            {type === 'lodgings' ? 
                <Card className="itin-card">
                    <Card.Header>Lodging Icon</Card.Header>
                    <Card.Body>

                    <Card.Text>{props.activity.name}</Card.Text>
                    <Card.Text>{props.activity.notes}</Card.Text>
                    <Card.Text>{props.activity.cost === 0 ? null : `$` + props.activity.cost}</Card.Text>
                    <Card.Text>{props.activity.address}</Card.Text>
                    <Card.Text>Check-in: {moment(props.activity.check_in.slice(0, 10)).format('MMM Do YYYY, h:mm a')}</Card.Text>
                    <Card.Text>Check-out: {moment(props.activity.datetime.slice(0, 10)).format('MMM Do YYYY, h:mm a')}</Card.Text>
                    <Card.Text>{props.activity.phone_number}</Card.Text>
                    <Card.Text><a rel="noopener noreferrer" href={props.activity.website} target="_blank">{props.activity.website}</a></Card.Text>
                    <Card.Text>{props.activity.address}</Card.Text>
                    {props.userId === props.creatorId ?
                        <>
                            <Button type='button' onClick={() => props.deleteObj(type, props.activity.id)}>Delete</Button>
                            <Button type='button' onClick={() => props.history.push(`/lodgings/form/${props.tripId}/${props.activity.id}`)}>Edit</Button>
                        </>
                        :
                        null
                    }
                    </Card.Body>
                </Card>
            : null
            }
        </div>
    )
}