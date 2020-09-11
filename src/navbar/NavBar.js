import React, { useState } from 'react'
import { Link } from "react-router-dom"

export default function NavBar(props) {
    
    const [loggedIn, setIsLoggedIn] = useState(false)

    const logout = () => {
        setIsLoggedIn(false)
        localStorage.removeItem("travlogapi_token")
    }

    const isAuthenticated = () =>
        loggedIn || localStorage.getItem('travlogapi_token') !== null

    const handleLogout = () => {
        props.setCurrentUser(false)
        logout()
        props.setCurrentUser(true)
        props.history.push('/')
    }

    return (
        <ul>
        {
            isAuthenticated() ?
                <>
                    <li>
                        <Link to="/trips">Trips</Link>
                    </li>
                    {/* <li>
                        <Link to="/tasks">Tasks</Link>
                    </li> */}
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <button
                            onClick={handleLogout}
                        >Logout</button>
                    </li>
                </>
                : null}
        {!isAuthenticated() ?
            <>
                <li >
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li >
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
            </>
            : null}
        </ul>
    )
}