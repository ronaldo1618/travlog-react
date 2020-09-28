import React, { useRef } from 'react'
import UseSimpleAuth from '../../hooks/UseSimpleAuth'
import { Button } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';

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
        <>
        <img className="img-bkgrnd" alt="" src='https://res.cloudinary.com/ddxpoaice/image/upload/v1601266397/travlog/kg1moejl15jps7kz0mha.jpg'/>
        <div className="login__container">
            <div className="travlog-title">
                <h1><span className="trav">TravLog</span><span className="log"><Icon className="compass outline" size="mini"></Icon></span></h1>
                {/* <hr className="travlog-title-hr"/> */}
                <p>Start tracking your trips</p>
            </div>
            <div className="login-container">
                <div className="login-box effect-shadow">
                    <form className="form--login" onSubmit={handleLogin}>
                        <h2>Welcome to TravLog!</h2>
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <fieldset>
                            <input ref={username} type="username"
                                className="form-control"
                                placeholder="Username"
                                required autoFocus />
                        </fieldset>
                        <fieldset>
                            <input ref={password} type="password"
                                id="password"
                                className="form-control"
                                placeholder="Password"
                                required />
                        </fieldset>
                        <p>New? <a href={`/register`}>Register Here.</a></p>
                        <fieldset>
                            <Button type="submit">
                                Sign in
                            </Button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}