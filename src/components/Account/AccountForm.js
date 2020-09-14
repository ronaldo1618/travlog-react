import React, { useState, useEffect, useRef } from 'react';
import apiManager from '../../modules/apiManager';

export default function AccountForm(props) {

    const username = useRef()
    const first_name = useRef()
    const last_name = useRef()
    const bio = useRef()
    const [traveler, setTraveler] = useState({user:{}})

    const getTraveler = () => {
        apiManager.getTraveler().then(traveler => setTraveler(traveler[0]))
    }

    const editTraveler = user => {
        // console.log(props.match.params.travelerId)
        const traveler = {
            id: user.id,
            bio: bio.current.value,
            first_name: first_name.current.value,
            last_name: last_name.current.value,
            username: username.current.value
        }
        apiManager.putObj('travelers', traveler).then(props.history.push(`/profile`))
    }

    useEffect(getTraveler, [])

    return (
        <>
            <form className="col-8 offset-2 text-left">
                <div className="form-group">
                <label htmlFor="username"><strong>Username</strong></label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    ref={username}
                    defaultValue={traveler.user.username}
                />
                </div>
                <div className="form-group">
                <label htmlFor="first-name"><strong>First Name</strong></label>
                <input
                    type="text"
                    className="form-control"
                    id="first-name"
                    ref={first_name}
                    defaultValue={traveler.user.first_name}
                />
                </div>
                <div className="form-group">
                <label htmlFor="last-name"><strong>Last Name</strong></label>
                <input
                    type="text"
                    className="form-control"
                    id="last-name"
                    ref={last_name}
                    defaultValue={traveler.user.last_name}
                />
                </div>
                <div className="form-group">
                <label htmlFor="bio"><strong>Bio</strong></label>
                <input
                    type="text"
                    className="form-control"
                    id="bio"
                    ref={bio}
                    defaultValue={traveler.bio}
                />
                </div>
                <button color="primary" onClick={() => editTraveler(traveler)}>Update Profile</button>
            </form>
        </>
    )
}