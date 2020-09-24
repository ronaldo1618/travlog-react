import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import apiManager from '../../modules/apiManager';

export default function AccountForm(props) {

    const username = useRef()
    const bio = useRef()
    const [traveler, setTraveler] = useState({user:{}})
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)

    const getTraveler = () => {
        apiManager.getTraveler().then(traveler => setTraveler(traveler[0]))
    }

    const editTraveler = (e) => {
        e.preventDefault()
        let img = image
        if(image === '' && traveler.profile_pic !== null) img = traveler.profile_pic
        if(image === '' && traveler.profile_pic === '') img = 'http://res.cloudinary.com/ddxpoaice/image/upload/v1600731000/travlog/fj8bpv5foqqmt1uyrdwt.jpg'
        if(!loading) {
            const newTraveler = {
                id: traveler.id,
                bio: bio.current.value,
                username: username.current.value,
                profile_pic: img
            }
            apiManager.putObj('travelers', newTraveler).then(res => {
                if(res.status === 500) return alert('username is taken!')
                props.history.push(`/profile`)
            })
        }
    }

    useEffect(getTraveler, [])

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'travlog')
        setLoading(true)
        apiManager.postPhoto(data).then(img => {
            setImage(img.url)
            setLoading(false)
        })
    }

    return (
        <div className="form-container">
            <div className="form">  
                <Form onSubmit={editTraveler}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text"
                        className="form-control"
                        id="username"
                        ref={username}
                        defaultValue={traveler.user.username}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Bio</Form.Label>
                        <Form.Control type="text"
                        className="form-control"
                        id="bio"
                        ref={bio}
                        defaultValue={traveler.bio}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.File onChange={uploadImage} type="file"
                        name="file"
                        className="form-control"
                        placeholder="Upload Image"
                        defaultValue={traveler.profile_pic}/>
                    </Form.Group>
                    <div>
                        {loading ? <p>Loading image...</p>:null}
                        <Button disabled={loading} type="submit" color="primary">Update Profile</Button>
                        <Button disabled={loading} type="button" onClick={() => props.history.push(`/profile`)}>Cancel</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}