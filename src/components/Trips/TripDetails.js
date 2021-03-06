import React, { useState, useEffect } from 'react';
import apiManager from '../../modules/apiManager';
import ItineraryList from './Itinerary/ItineraryList';
import { Icon } from 'semantic-ui-react';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import '../../index.css';

export default function TripDetails(props) {

    const [user, setUser] = useState(Number)
    const [type, setType] = useState('')
    const [trip, setTrip] = useState({})
    const [totalCost, setTotalCost] = useState(Number)
    const [itinerary, setItinerary] = useState([{all_activities: []}])
    const [creator, setTripCreator] = useState({user:{}})
    const [showItinerary, setShowItinerary] = useState(false)
    const toggle = () => setShowItinerary(!showItinerary)

    const getTrip = () => {
        apiManager.getTrip(props.tripId).then(trip => {
            setTripCreator(trip.creator)
            setTrip(trip)
            setType(trip.url.split('8000/')[1].split('/')[0])
        }).then(getItinerary)
    }

    const deleteObj = (type, id) => {
        apiManager.deleteObj(type, id).then(props.history.push('/trips/'))
    }
    
    const getItinerary = () => {
        apiManager.getItinerary(props.tripId).then(itinerary => {
            itinerary.forEach(itinerary_day => {
                itinerary_day.all_activities = [...itinerary_day.activities,...itinerary_day.food,...itinerary_day.lodging,...itinerary_day.transportation]
                itinerary_day.all_activities.sort((a,b) => new Date(a.datetime) - new Date(b.datetime))
            });
            itinerary.sort((a,b) => a.id - b.id)
            setItinerary(itinerary)
            calculateTotalCost(itinerary)
        })
    }

    const calculateTotalCost = (itinerary) => {
        let totalCost = 0
        itinerary.forEach(itinerary_day => {
            itinerary_day.all_activities.forEach(activity => {
                totalCost += activity.cost
            })
        })
        setTotalCost(totalCost.toFixed(2))
    }

    const getUser = () => {
        apiManager.getTraveler().then(user => setUser(user[0].id))
    }

    useEffect(getUser, [])
    useEffect(getTrip, [])

    const copyTrip = () => {
        apiManager.getById('trips', props.tripId).then(trip => {
            apiManager.postObj('trips', trip).then(trip => {
                apiManager.getItinerary(props.tripId).then(itinerary => {
                    itinerary.forEach(itinerary_day => {
                        itinerary_day.all_activities = [...itinerary_day.activities,...itinerary_day.food,...itinerary_day.lodging,...itinerary_day.transportation]
                    });
                    copyDayItinerary(trip.id, itinerary)
                }).then(() => props.history.push('/trips'))
            })
        })
    }

    async function copyDayItinerary(tripId, itinerary) {
        for (let i = 0; i < itinerary.length; i++) {
            const day_itinerary = {
                name: itinerary[i].name,
                description: itinerary[i].description,
                trip_id: tripId
            }   
            try {
                await apiManager.postObj('day_itinerarys', day_itinerary).then(new_day_itinerary => {
                    copyActivities(new_day_itinerary.id, itinerary[i].all_activities)
                })
            } catch (error) {
                console.error(error.message)
            }
        }
    }

    async function copyActivities(dayItineraryId, activities) {
        for (let i = 0; i < activities.length; i++) {
            const type = activities[i].url.split('8000/')[1].split('/')[0]
            activities[i].day_itinerary_id = dayItineraryId
            try {
                await apiManager.postObj(type, activities[i])
            } catch (error) {
                console.error(error.message)
            }
        }
    }

    return (
        <div className="bg-color">
        <div className="trip-detail-container">
            <div className="trip-detail-title">
                <div className="trip-detail-info effect-shadow">
                    {user === trip.creator_id ?
                    <div className="trip-details-btn-container">
                        <Icon size="large" link onClick={() => deleteObj(type, trip.id)} className="trash trash-edit"></Icon>
                        <h1>{trip.title}</h1>
                        <Icon size="large" link onClick={() => props.history.push(`/trips/form/${trip.id}`)} className="edit trash-edit"></Icon>
                    </div>
                    :
                    <>
                    <h1>{trip.title}</h1>
                    <Button variant="outline-primary" className="button-group-icons" type="button" onClick={copyTrip}>Copy Trip</Button>
                    </>
                    }
                    <h3>{trip.description}</h3>
                    {totalCost > 0 ?
                    <h3>Trip Cost: ${totalCost}</h3>
                    :
                    null
                    }
                    <div className="profile-pic-info">
                        {creator.profile_pic ?
                        <a className="circular--landscape-detail" href={`/profile/${trip.creator_id}`}><img className="card-creator-img" alt="" src={creator.profile_pic}/></a>
                        :
                        null
                        }
                        <div>
                            <a href={`/profile/${trip.creator_id}`}><p>{creator.user.username}</p></a>
                            <p><small className="text-muted">{moment(trip.date_created, 'YYYY-MM-DD').format("MMM Do YYYY")}</small></p>
                        </div>
                    </div>
                </div>
                <div className="trip-detail-btns-container">
                    {user === trip.creator_id ?
                    <div className="trip-details-btns">
                        
                        <div className="button-group-icons">
                            <Icon.Group className="icon-btn" size="big">
                                <Icon circular link onClick={() => {props.history.push(`/transportations/form/${props.tripId}`)}} className="car"></Icon>
                                <Icon corner name='add'/>
                            </Icon.Group>
                            <Icon.Group className="icon-btn" size="big">
                                <Icon circular link onClick={() => {props.history.push(`/foods/form/${props.tripId}`)}} className="food"></Icon>
                                <Icon corner name='add'/>
                            </Icon.Group>
                            <Icon.Group className="icon-btn" size="big">
                                <Icon circular link onClick={() => {props.history.push(`/activitys/form/${props.tripId}`)}} className="bicycle"></Icon>
                                <Icon corner name='add'/>
                            </Icon.Group>
                            <Icon.Group className="icon-btn" size="big">
                                <Icon circular link onClick={() => {props.history.push(`/lodgings/form/${props.tripId}`)}} className="hotel"></Icon>
                                <Icon corner name='add'/>
                            </Icon.Group>
                        </div> 
                    </div>
                    :
                    null
                    }
                </div>
            </div>
            </div>
            <div className="trip-itinerary">
                {!showItinerary ?
                    <div className="">
                        <div onClick={toggle} className="flex-center itinerary-toggle effect-shadow">
                            <hr/>
                            <div>
                                <h2 className=""><Icon className="angle down"></Icon>Itinerary</h2>
                                {user === trip.creator_id ?
                                <div>
                                    <Button variant="outline-primary" type='button' onClick={() => props.history.push(`/day_itinerarys/form/${trip.id}`)}>Add Itinerary Category</Button>
                                </div>
                                :
                                null
                                }
                            </div>
                            <hr/>
                        </div>
                        <div>
                        {itinerary.map((itinerary_day, index) => <ItineraryList key={index} userId={user} itinerary_day={itinerary_day} getTrip={getTrip} creatorId={trip.creator_id} {...props}/>)}
                        </div>
                    </div>
                    :
                    <div onClick={toggle} className="flex-center itinerary-toggle effect-shadow">
                        <hr/>
                        <div>
                            <h2 className=""><Icon className="angle right"></Icon>Itinerary</h2>
                            {user === trip.creator_id ?
                            <div>
                                <Button type='button' onClick={() => props.history.push(`/day_itinerarys/form/${trip.id}`)}>Add Itinerary Category</Button>
                            </div>
                            :
                            null
                            }
                        </div>
                        <hr/>
                    </div>
                }
            </div>
        </div>
    )
}