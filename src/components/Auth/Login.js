import React, { useRef } from 'react'
import UseSimpleAuth from '../../hooks/UseSimpleAuth'

export default function Login(props) {
    const username = useRef()
    const password = useRef()
    const { login } = UseSimpleAuth()

    const handleLogin = (e) => {
        e.preventDefault()
        props.setIsCurrentUser(false)

        const credentials = {
            "username": username.current.value,
            "password": password.current.value
        }

        login(credentials)
            .then(() => {
                props.setIsCurrentUser(true)
                props.history.push('/')
            })
    }

    return (
        <div className="hero-image">
            <div className="login-container">
                <div className="login-box">
                    <form className="form--login" onSubmit={handleLogin}>
                        <h2>Welcome to TravLog!</h2>
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <fieldset>
                            <label htmlFor="inputEmail"> Username </label>
                            <input ref={username} type="username"
                                className="form-control"
                                placeholder="Username"
                                required autoFocus />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="inputPassword"> Password </label>
                            <input ref={password} type="password"
                                id="password"
                                className="form-control"
                                placeholder="Password"
                                required />
                        </fieldset>
                        <p>New? <a href={`/register`}>Register Here.</a></p>
                        <fieldset>
                            <button type="submit">
                                Sign in
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}