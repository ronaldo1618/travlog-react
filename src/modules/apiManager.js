const remoteURL = 'http://localhost:8000';

export default {
    getTripsForHomepage() {
        return fetch(`${remoteURL}/trips?homepage`, {
            'method': 'GET',
            'headers': {
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('travlogapi_token')}`
            }
        }).then(res => res.json())
    }
}