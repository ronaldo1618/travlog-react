import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

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
        <>
        {/* {isAuthenticated() ?
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Trav/Log</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className={`nav-link ${props.location.pathname === "/" ? 'active' : ''}`} href="/">Home</Nav.Link>
                    <Nav.Link className={`nav-link ${props.location.pathname === "/trips" ? 'active' : ''}`} href="/trips">Trips</Nav.Link>
                    <Nav.Link className={`nav-link ${props.location.pathname === "/profile" ? 'active' : ''}`} href="/profile">Profile</Nav.Link>
                    <Nav.Link className="logout" onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        :
        null
        } */}
        <nav className="nav-bar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a href="#" className="nav-linkin">
                        <span className="link-text">Trav/Log</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-linkin">
                        <span className="link-text">Home</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-linkin">
                        <span className="link-text">Trips</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-linkin">
                        <span className="link-text">Profile</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-linkin">
                        <span className="link-text">Logout</span>
                    </a>
                </li>
            </ul>
        </nav>
        </>
    )
}