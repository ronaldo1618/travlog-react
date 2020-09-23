import React from 'react';
import moment from 'moment';
import { Card, CardTitle, CardText, CardBody, CardImg } from 'reactstrap';
import { Icon} from 'semantic-ui-react';

export default function TripCard(props) {

    const type = props.trip.url.split('8000/')[1].split('/')[0]
    
    return (
        <div className="trip-card">
            <Card>
                <div className="img-container">
                    <a href={`/trips/${props.tripId}`}><CardImg className="overlay-img" src={props.trip.overlay_image} alt="Card image cap"/></a>
                </div>
                <CardBody className="trip-card-body">
                    {props.userId === props.trip.creator_id && props.deleteObj ?
                    <div className="btm-btns">
                        <Icon link onClick={() => props.deleteObj(type, props.trip.id)} className="trash"></Icon>
                        <Icon link onClick={() => props.history.push(`/trips/form/${props.trip.id}`)} className="edit"></Icon>
                    </div>
                    : null}
                    <CardTitle><a href={`/trips/${props.tripId}`}>{props.trip.title}</a></CardTitle>
                    {/* {props.trip.description.length > 65 ?
                    <CardText>{props.trip.description.slice(0, 65)}<a href={`/trips/${props.tripId}`}>...read more</a></CardText>
                    :
                    <CardText>{props.trip.description}</CardText>
                    } */}
                    <div className="profile-pic-info">
                        {props.creator.profile_pic ?
                        <a className="circular--landscape" href={`/profile/${props.trip.creator_id}`}><img className="card-creator-img" alt="" src={props.creator.profile_pic}/></a>
                        :
                        null
                        }
                        <div>
                            <a href={`/profile/${props.trip.creator_id}`}><CardText>{props.creator.user.username}</CardText></a>
                            <CardText><small className="text-muted">{moment(props.trip.date_created, 'YYYY-MM-DD').format("MMM Do YYYY")}</small></CardText>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}