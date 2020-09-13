const remoteURL = 'http://localhost:8000';

export default {
    getTripsForHomepage() {
        return fetch(`${remoteURL}/trips?homepage`, {
            mthod: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('travlogapi_token')}`
            }
        }).then(res => res.json())
    },
    getTraveler() {
        return fetch(`${remoteURL}/travelers`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('travlogapi_token')}`
            }
        }).then(res => res.json())
    },
    getTrips() {
        return fetch(`${remoteURL}/trips?creator`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('travlogapi_token')}`
            }
        }).then(res => res.json())
    },
    getTrip(id) {
        return fetch(`${remoteURL}/trips/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('travlogapi_token')}`
            }
        }).then(res => res.json())
    },
    postTrip(trip) {
        return fetch(`${remoteURL}/trips`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('travlogapi_token')}`
            },
            body: JSON.stringify(trip)
        })
    },
    postDayItinerary(day_itinerary) {
        return fetch(`${remoteURL}/day_itinerarys`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('travlogapi_token')}`
            },
            body: JSON.stringify(day_itinerary)
        })
    },
    postTransportation(transportation) {
        return fetch(`${remoteURL}/transportations`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('travlogapi_token')}`
            },
            body: JSON.stringify(transportation)
        })
    },
    getItinerary(tripId) {
        return fetch(`${remoteURL}/day_itinerarys?trip=${tripId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('travlogapi_token')}`
            }
        }).then(res => res.json())
    },
    getById(param, id) {
        return fetch(`${remoteURL}/${param}/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('travlogapi_token')}`
            }
        }).then(res => res.json())
    },
    deleteTransportation(id) {
        return fetch(`${remoteURL}/transportations/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${localStorage.getItem('travlogapi_token')}`
            }
        })
    },
    getActivities(day_itinerary) {
        return fetch(`${remoteURL}/activitys?day_itinerary=${day_itinerary}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('travlogapi_token')}`
            }
        }).then(res => res.json())
    }
}