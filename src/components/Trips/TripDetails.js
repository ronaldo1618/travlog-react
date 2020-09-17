import React, { useState, useEffect } from 'react';
import apiManager from '../../modules/apiManager';
import ItineraryList from './Itinerary/ItineraryList';
import { Icon } from 'semantic-ui-react'; 
import './Trip.css';

export default function TripDetails(props) {

    const [user, setUser] = useState(Number)
    const [type, setType] = useState('')
    const [trip, setTrip] = useState({})
    const [totalCost, setTotalCost] = useState(Number)
    const [itinerary, setItinerary] = useState([{all_activities: []}])
    const [showItinerary, setShowItinerary] = useState(false)
    const toggle = () => setShowItinerary(!showItinerary)

    const getTrip = () => {
        apiManager.getTrip(props.tripId).then(trip => {
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
        <>
            <h1>{trip.title}</h1>
            <h3>{trip.description}</h3>
            <h3>Trip Cost: ${totalCost}</h3>
            <div>
                {user === trip.creator_id ?
                    <>
                    <div>
                        <button type='button' onClick={() => deleteObj(type, trip.id)}>Delete</button>
                        <button type='button' onClick={() => props.history.push(`/trips/form/${trip.id}`)}>Edit</button>
                    </div>
                    <br/>
                    <div className="">
                        <Icon.Group size="big">
                            <Icon circular link onClick={() => {props.history.push(`/transportations/form/${props.tripId}`)}} className="car"></Icon>
                            <Icon corner name='add'/>
                        </Icon.Group>
                        <Icon.Group size="big">
                            <Icon circular link onClick={() => {props.history.push(`/foods/form/${props.tripId}`)}} className="food"></Icon>
                            <Icon corner name='add'/>
                        </Icon.Group>
                        <Icon.Group size="big">
                            <Icon circular link onClick={() => {props.history.push(`/activitys/form/${props.tripId}`)}} className="bicycle"></Icon>
                            <Icon corner name='add'/>
                        </Icon.Group>
                        <Icon.Group size="big">
                            <Icon circular link onClick={() => {props.history.push(`/lodgings/form/${props.tripId}`)}} className="hotel"></Icon>
                            <Icon corner name='add'/>
                        </Icon.Group>
                    </div>
                    </>
                    :
                    <>
                        <input type="button" value="Copy Trip" onClick={copyTrip}/>
                    </>
                }
            </div>
            <br/>
            {!showItinerary ?
                <div>
                    <div onClick={toggle} className="itinerary-toggle">
                        <hr/>
                        <h2 className=""><Icon className="angle down"></Icon>Itinerary</h2>
                        <hr/>
                    </div>
                    {itinerary.map((itinerary_day, index) => <ItineraryList key={index} userId={user} itinerary_day={itinerary_day} getTrip={getTrip} creatorId={trip.creator_id} {...props}/>)}
                </div>
                :
                <div onClick={toggle} className="itinerary-toggle">
                    <hr/>
                    <h2 className=""><Icon className="angle right"></Icon>Itinerary</h2>
                    <hr/>
                </div>
            }
        </>
    )
}