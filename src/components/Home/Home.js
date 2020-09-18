import React, { useState, useEffect } from 'react';
import apiManager from '../../modules/apiManager';
import TripCard from '../Trips/TripCard';
import ItineraryList from '../Trips/Itinerary/ItineraryList';
import { Icon } from 'semantic-ui-react';
import '../Trips/Trip.css'

export default function Home(props) {

    const [user, setUser] = useState(Number)
    const [trips, setTrips] = useState([])
    const [userHomePageTrip, setUserHomePageTrip] = useState({})
    const [totalCost, setTotalCost] = useState(Number)
    const [itinerary, setItinerary] = useState([{all_activities: []}])
    const [showItinerary, setShowItinerary] = useState(false)
    const toggle = () => setShowItinerary(!showItinerary)

    const getTrips = () => {
        apiManager.getTripsForHomepage().then(trip => {
            trips.sort((a,b) => b.id - a.id)
            setTrips(trip)
        })
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

    useEffect(getTrip, [])
    useEffect(getTrips, [])

    return (
        <>
            {userHomePageTrip.id ?
                <>
                <hr/>
                <div className="flex-center">
                    <div>
                        <h1><a href={`/trips/${userHomePageTrip.id}`}>{userHomePageTrip.title}</a></h1>
                        <h3>Description: {userHomePageTrip.description}</h3>
                        <h3>Trip Cost: ${totalCost}</h3>
                    </div>
                </div>
                <div className="flex-center">
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
                </>
                :
                null
            }
            <hr/>
            <div className="flex-center">
                <h1>Explore</h1>
            </div>
            <div className="trip-cards">
                <>{trips.map(trip => <TripCard key={trip.id} userId={user} tripId={trip.id} trip={trip} {...props}/>)}</>
            </div>
        </>
    )
}