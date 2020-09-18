import key from '../apiKeys';
const remoteURL = 'http://localhost:8000';
const googlePlacesKey = key.googlePlacesKey
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

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
    postObj(type, obj) {
        return fetch(`${remoteURL}/${type}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('travlogapi_token')}`
            },
            body: JSON.stringify(obj)
        }).then(res => res.json())
    },
    putObj(type, obj) {
        return fetch(`${remoteURL}/${type}/${obj.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('travlogapi_token')}`
            },
            body: JSON.stringify(obj)
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
    deleteObj(type, id) {
        return fetch(`${remoteURL}/${type}/${id}`, {
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
    },
    getUserTripForHomePage() {
        return fetch(`${remoteURL}/trips?user_homepage`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('travlogapi_token')}`
            }
        }).then(res => res.json())
    },
    search(city, value) {
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${city}&key=${googlePlacesKey}`
        return fetch(proxyUrl + url).then(res => res.json())
    },
    postPhoto(data){
        return fetch('https://api.cloudinary.com/v1_1/ddxpoaice/image/upload', {
            method: 'POST',
            body: data
        }).then(res => res.json())
    }
}