import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import apiManager from '../../modules/apiManager';

export default function AccountForm(props) {

    const username = useRef()
    // const first_name = useRef()
    // const last_name = useRef()
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
                // first_name: first_name.current.value,
                // last_name: last_name.current.value,
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
            console.log(img.url)
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
                    {/* <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text"
                        className="form-control"
                        id="first-name"
                        ref={first_name}
                        defaultValue={traveler.user.first_name}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text"
                        className="form-control"
                        id="last-name"
                        ref={last_name}
                        defaultValue={traveler.user.last_name}/>
                    </Form.Group> */}
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
                    </div>
                </Form>
            </div>
        </div>
    )
}