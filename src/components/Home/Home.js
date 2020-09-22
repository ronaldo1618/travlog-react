import React, { useState, useEffect, useRef } from 'react';
import apiManager from '../../modules/apiManager';
import TripCard from '../Trips/TripCard';
import ItineraryList from '../Trips/Itinerary/ItineraryList';
import { Icon } from 'semantic-ui-react';
import { InputGroup, InputGroupAddon } from 'reactstrap';
import { Button } from 'reactstrap';
import '../Trips/Trip.css';

export default function Home(props) {

    const searchTerm = useRef();
    const [user, setUser] = useState(Number)
    const [traveler, setTraveler] = useState({user:{}})
    const [trips, setTrips] = useState([])
    const [userHomePageTrip, setUserHomePageTrip] = useState({})
    const [totalCost, setTotalCost] = useState(Number)
    const [itinerary, setItinerary] = useState([{all_activities: []}])
    const [showItinerary, setShowItinerary] = useState(false)
    const [loading, setLoading] = useState(false)
    const toggle = () => setShowItinerary(!showItinerary)
    const [tripCreators, setTripCreators] = useState([{user:{}}])

    const getTrips = () => {
        if(searchTerm.current.value) {
            apiManager.search(searchTerm.current.value).then(trips => {
                setLoading(true)
                settingTrips(trips)
            })
        } else {
            apiManager.getTripsForHomepage().then(trips => {
                setLoading(true)
                settingTrips(trips)
            })
        }
    }

    const settingTrips = (trips) => {
        let creators = []
        trips.sort((a,b) => b.id - a.id)
        trips.forEach(trip => {
            creators.push(trip.creator)
        });
        setTripCreators(creators)
        setTrips(trips)
        setLoading(false)
    }

    const getTrip = () => {
        apiManager.getTraveler().then(user => {
            setUser(user[0].id)
            apiManager.getUserTripForHomePage().then(trip => {
                if (trip.length === 0) return
                setUserHomePageTrip(trip[0])
                getItinerary(trip[0].id)
            })
        })
    }

    const getItinerary = (id) => {
        apiManager.getItinerary(id).then(itinerary => {
            itinerary.forEach(itinerary_day => {
                itinerary_day.all_activities = [...itinerary_day.activities,...itinerary_day.food,...itinerary_day.lodging,...itinerary_day.transportation]
                itinerary_day.all_activities.sort((a,b) => new Date(a.datetime) - new Date(b.datetime))
            });
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
        apiManager.getTraveler().then(user => setTraveler(user[0]))
    }

    const deleteObj = (type, id) => {
        apiManager.deleteObj(type, id).then(getTrips)
    }

    useEffect(getUser, [])
    useEffect(getTrip, [])
    useEffect(getTrips, [])

    return (
        <>
            {userHomePageTrip.id ?
            <div className="itin-list">
                {/* <div className="flex-center">
                    <div>
                        <h1><a href={`/trips/${userHomePageTrip.id}`}>{userHomePageTrip.title}</a></h1>
                        <h3>Description: {userHomePageTrip.description}</h3>
                        <h3>Trip Cost: ${totalCost}</h3>
                    </div>
                </div> */}
                <div className="trip-detail-info">
                    <a href={`/trips/${userHomePageTrip.id}`}><h1>{userHomePageTrip.title}</h1></a>
                    <h3>{userHomePageTrip.description}</h3>
                    <h3>Trip Cost: ${totalCost}</h3>
                    <div className="profile-pic-info">
                        {traveler.profile_pic ?
                        <a className="circular--landscape" href={`/profile/${userHomePageTrip.creator_id}`}><img className="card-creator-img" alt="" src={traveler.profile_pic}/></a>
                        :
                        null
                        }
                        <div>
                            <a href={`/profile/${userHomePageTrip.creator_id}`}><p>{traveler.user.username}</p></a>
                            <p><small className="text-muted">{userHomePageTrip.date_created}</small></p>
                        </div>
                    </div>
                </div>
                <div className="button-group-icons">
                    {user === userHomePageTrip.creator_id ?
                        <div className="">
                        <Icon.Group size="big">
                            <Icon circular link onClick={() => {props.history.push(`/transportations/form/${userHomePageTrip.id}`)}} className="car"></Icon>
                            <Icon corner name='add'/>
                        </Icon.Group>
                        <Icon.Group size="big">
                            <Icon circular link onClick={() => {props.history.push(`/foods/form/${userHomePageTrip.id}`)}} className="food"></Icon>
                            <Icon corner name='add'/>
                        </Icon.Group>
                        <Icon.Group size="big">
                            <Icon circular link onClick={() => {props.history.push(`/activitys/form/${userHomePageTrip.id}`)}} className="bicycle"></Icon>
                            <Icon corner name='add'/>
                        </Icon.Group>
                        <Icon.Group size="big">
                            <Icon circular link onClick={() => {props.history.push(`/lodgings/form/${userHomePageTrip.id}`)}} className="hotel"></Icon>
                            <Icon corner name='add'/>
                        </Icon.Group>
                    </div>
                        :
                        <input type="button" value="Copy Trip" onClick={() => {props.history.push(`/day_itinerarys/form/${userHomePageTrip.id}`)}}/>
                    }
                </div>
            
                {itinerary.length === 0 ?
                null
                :
                <>
                    {showItinerary ?
                        <div>
                            <div onClick={toggle} className="flex-center itinerary-toggle">
                                <hr/>
                                <h2 className=""><Icon className="angle down"></Icon>Itinerary</h2>
                                <hr/>
                            </div>
                            {itinerary.map((itinerary_day, index) => <ItineraryList key={index} userId={user} itinerary_day={itinerary_day} getTrip={getTrip} creatorId={userHomePageTrip.creator_id} {...props}/>)}
                        </div>
                        :
                        <div onClick={toggle} className="flex-center itinerary-toggle">
                            <hr/>
                            <h2 className=""><Icon className="angle right"></Icon>Itinerary</h2>
                            <hr/>
                        </div>
                    }
                </>
                }
            </div>
            :
            null
            }
            <hr/>
            <div className="itin-list">
                <h1>Explore</h1>
                <div>
                    <InputGroup>
                        <input className="search-bar" ref={searchTerm} type="text" placeholder="   search by trip name"/>
                        <InputGroupAddon addonType="append"><Button onClick={getTrips}>Search</Button></InputGroupAddon>
                    </InputGroup>
                </div>
            </div>
            <div className="trip-cards">
                {!loading ?
                <>{trips.map((trip, index) => <TripCard key={trip.id} userId={user} tripId={trip.id} trip={trip} deleteObj={deleteObj} creator={tripCreators[index]} {...props}/>)}</>
                :
                null
                }
            </div>
        </>
    )
}