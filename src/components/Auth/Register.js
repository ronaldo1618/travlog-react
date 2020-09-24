import React, { useRef, useState } from 'react'
import { withRouter } from "react-router-dom"
import UseSimpleAuth from '../../hooks/UseSimpleAuth'
import apiManager from '../../modules/apiManager';
import { Button, Form } from 'react-bootstrap';
import '../../index.css';

function Register(props) {
    const email = useRef()
    const userName = useRef()
    const password = useRef()
    const bio = useRef()
    const verifyPassword = useRef()
    const { register } = UseSimpleAuth()
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleRegister = (e) => {
        e.preventDefault()
        props.setIsCurrentUser(false)
        let img = image
        if (userName.current.value === '') return alert('Please fill out the username field!')
        if (password.current.value === '') return alert('Please fill out the password field!')
        if (password.current.value !== verifyPassword.current.value) return alert('Passwords do not match!')
        if(image === '') img = 'http://res.cloudinary.com/ddxpoaice/image/upload/v1600731000/travlog/fj8bpv5foqqmt1uyrdwt.jpg'
        if(!loading) {
            const newUser = {
                "username": userName.current.value,
                "email": email.current.value,
                "password": password.current.value,
                "bio": bio.current.value,
                'profile_pic': img
            }
            register(newUser).then(res => {
                if(res) {
                    localStorage.setItem("travlogapi_token", res.token)
                    props.setIsCurrentUser(true)
                    props.history.push('/')
                } else {
                    return alert('Username is taken!')
                }
            })
        }
    }

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
        <>
        <img className="img-bkgrnd" alt="" src='https://s.inspirockcdn.com/partners/visittheusa-home.jpg'/>
        <div>
        <div className="register-container">
        <div className="login-box">
            <Form className="" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register to use TravLog!</h1>
                <Form.Group>
                    <Form.Control ref={userName} type="text"
                        name="userName"
                        className="form-control"
                        placeholder="Username"
                        required autoFocus />
                </Form.Group>
                <Form.Group>
                    <Form.Control ref={email} type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email address"
                        required />
                </Form.Group>
                <Form.Group>
                    <Form.Control ref={bio} type="text"
                        name="bio"
                        className="form-control"
                        placeholder="Bio"/>
                </Form.Group>
                <Form.Group>
                    <Form.Control ref={password} type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        required />
                </Form.Group>
                <Form.Group>
                    <Form.Control ref={verifyPassword} type="password"
                        name="verifyPassword"
                        className="form-control"
                        placeholder="Verify password"
                        required />
                </Form.Group>
                <Form.Group>
                        <Form.File onChange={uploadImage} type="file"
                        name="file"
                        className="form-control"
                        placeholder="Upload Image"/>
                </Form.Group>
                <p>Already a user? <a href={`/login`}>Login Here.</a></p>
                <Form.Group>
                    {loading ? <p>Loading image...</p>:null}
                    <Button disabled={loading} type="submit">Register</Button>
                </Form.Group>
            </Form>
        </div>
        </div>
        </div>
        </>
    )
}
export default withRouter(Register)