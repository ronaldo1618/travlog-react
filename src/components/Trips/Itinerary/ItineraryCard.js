import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';
import '../../../index.css';


export default function ItineraryCard(props) {

    const type = props.activity.url.split('8000/')[1].split('/')[0]

    return (
        <div className="itin-card-container">
            <Card className="itin-card border-0">
                <Card.Body className="itin-card-body">
            {type === 'transportations' ? 
            <>
                    <Card.Title>{props.activity.name}</Card.Title>
                    <Card.Text>{props.activity.notes}</Card.Text>
                    {props.activity.cost > 0 ?
                    <Card.Text><Icon className="dollar"></Icon>{props.activity.cost.toFixed(2)}</Card.Text>
                    : null
                    }
                    <Card.Text><Icon className="calendar check"></Icon>{moment(props.activity.dep_datetime).format('MMM Do YYYY, h:mm a')}</Card.Text>
                    <Card.Text><Icon className="calendar times"></Icon>{moment(props.activity.datetime.slice(0, 10)).format('MMM Do YYYY, h:mm a')}</Card.Text>
                    {props.userId === props.creatorId ?
                        <>
                            <Button variant="danger" className="danger-btn" type='button' onClick={() => props.deleteObj(type, props.activity.id)}>Delete</Button>
                            <Button variant="outline-primary" type='button' onClick={() => props.history.push(`/transportations/form/${props.tripId}/${props.activity.id}`)}>Edit</Button>
                        </>
                        :
                        null
                    }
                    </>
            : null
            }
            {type === 'activitys' ?
            <>
                    <Card.Title>{props.activity.name}</Card.Title>
                    <Card.Text>{props.activity.notes}</Card.Text>
                    {props.activity.cost > 0 ?
                    <Card.Text><Icon className="dollar"></Icon>{props.activity.cost.toFixed(2)}</Card.Text>
                    : null
                    }
                    <Card.Text><Icon className="map marker alternate"></Icon>{props.activity.address}</Card.Text>
                    <Card.Text><Icon className="calendar check"></Icon>{moment(props.activity.datetime.slice(0, 10), 'YYYY-MM-DD').format('MMM Do YYYY')}</Card.Text>
                    {props.userId === props.creatorId ?
                        <>
                            <Button variant="danger" className="danger-btn" type='button' onClick={() => props.deleteObj(type, props.activity.id)}>Delete</Button>
                            <Button variant="outline-primary" type='button' onClick={() => props.history.push(`/activitys/form/${props.tripId}/${props.activity.id}`)}>Edit</Button>
                        </>
                        :
                        null
                    }
                    </>
            : null
            }
            {type === 'foods' ?
            <> 
                    <Card.Title>{props.activity.name}</Card.Title>
                    <Card.Text>{props.activity.notes}</Card.Text>
                    {props.activity.cost > 0 ?
                    <Card.Text><Icon className="dollar"></Icon>{props.activity.cost.toFixed(2)}</Card.Text>
                    : null
                    }
                    <Card.Text><Icon className="map marker alternate"></Icon>{props.activity.address}</Card.Text>
                    <Card.Text><Icon className="calendar check"></Icon>{moment(props.activity.datetime.slice(0, 10), 'YYYY-MM-DD').format('MMM Do YYYY')}</Card.Text>
                    {props.userId === props.creatorId ?
                        <>
                            <Button variant="danger" className="danger-btn" type='button' onClick={() => props.deleteObj(type, props.activity.id)}>Delete</Button>
                            <Button variant="outline-primary" type='button' onClick={() => props.history.push(`/foods/form/${props.tripId}/${props.activity.id}`)}>Edit</Button>
                        </>
                        :
                        null
                    }
                    </>
            : null
            }
            {type === 'lodgings' ?
            <>
                    <Card.Title>{props.activity.name}</Card.Title>
                    <Card.Text>{props.activity.notes}</Card.Text>
                    {props.activity.cost > 0 ?
                    <Card.Text><Icon className="dollar"></Icon>{props.activity.cost.toFixed(2)}</Card.Text>
                    : null
                    }
                    <Card.Text><Icon className="calendar check"></Icon>{moment(props.activity.check_in.slice(0, 10)).format('MMM Do YYYY, h:mm a')}</Card.Text>
                    <Card.Text><Icon className="calendar times"></Icon>{moment(props.activity.datetime.slice(0, 10)).format('MMM Do YYYY, h:mm a')}</Card.Text>
                    <Card.Text><Icon className="phone"></Icon>{props.activity.phone_number}</Card.Text>
                    <Card.Text><Icon className="world"></Icon><a rel="noopener noreferrer" href={props.activity.website} target="_blank">{props.activity.website}</a></Card.Text>
                    <Card.Text><Icon className="map marker alternate"></Icon>{props.activity.address}</Card.Text>
                    {props.userId === props.creatorId ?
                        <>
                            <Button variant="danger" className="danger-btn" type='button' onClick={() => props.deleteObj(type, props.activity.id)}>Delete</Button>
                            <Button variant="outline-primary" type='button' onClick={() => props.history.push(`/lodgings/form/${props.tripId}/${props.activity.id}`)}>Edit</Button>
                        </>
                        :
                        null
                    }
                    </>
            : null
            }
                </Card.Body>
            </Card>
        </div>
    )
}