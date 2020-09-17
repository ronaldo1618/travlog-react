import React, { useRef } from 'react'
import { withRouter } from "react-router-dom"
import UseSimpleAuth from '../../hooks/UseSimpleAuth'


function Register(props) {
    const email = useRef()
    const userName = useRef()
    const lastName = useRef()
    const password = useRef()
    const firstName = useRef()
    const bio = useRef()
    const verifyPassword = useRef()
    const { register } = UseSimpleAuth()

    const handleRegister = (e) => {
        e.preventDefault()
        props.setIsCurrentUser(false)
        if (userName.current.value === '') return alert('Please fill out the username field!')
        if (password.current.value === '') return alert('Please fill out the password field!')
        if (password.current.value !== verifyPassword.current.value) return alert('Passwords do not match!')

        const newUser = {
            "username": userName.current.value,
            "first_name": firstName.current.value,
            "last_name": lastName.current.value,
            "email": email.current.value,
            "password": password.current.value,
            "bio": bio.current.value
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

    return (
        <form className="form--login" onSubmit={handleRegister}>
            <h1 className="h3 mb-3 font-weight-normal">Register to use Bangazon</h1>
            <fieldset>
                <label htmlFor="userName"> Username </label>
                <input ref={userName} type="text"
                    name="userName"
                    className="form-control"
                    placeholder="Username"
                    required autoFocus />
            </fieldset>
            <fieldset>
                <label htmlFor="firstName"> First Name </label>
                <input ref={firstName} type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="First name"
                    required autoFocus />
            </fieldset>
            <fieldset>
                <label htmlFor="lastName"> Last Name </label>
                <input ref={lastName} type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Last name"
                    required />
            </fieldset>
            <fieldset>
                <label htmlFor="inputEmail"> Email address </label>
                <input ref={email} type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email address"
                    required />
            </fieldset>
            <fieldset>
                <label htmlFor="bio"> Bio </label>
                <input ref={bio} type="text"
                    name="bio"
                    className="form-control"
                    placeholder="Bio"
                    required />
            </fieldset>
            <fieldset>
                <label htmlFor="inputPassword"> Password </label>
                <input ref={password} type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    required />
            </fieldset>
            <fieldset>
                <label htmlFor="verifyPassword"> Verify Password </label>
                <input ref={verifyPassword} type="password"
                    name="verifyPassword"
                    className="form-control"
                    placeholder="Verify password"
                    required />
            </fieldset>
            <fieldset>
                <button type="submit">
                    Register
                    </button>
            </fieldset>
        </form>
    )
}
export default withRouter(Register)