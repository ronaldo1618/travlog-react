import { useState } from 'react'

function UseSimpleAuth() {

    const [loggedIn, setIsLoggedIn] = useState(false)

    const isAuthenticated = () =>
        loggedIn || localStorage.getItem('travlogapi_token') !== null

    const register = user => {
        return fetch("http://127.0.0.1:8000/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                if (res.status === 500) return false
                if (res.status === 200) {
                    setIsLoggedIn(true)
                    return res.json()
                }
            })
            
    }

    const login = credentials => {
        return fetch("http://127.0.0.1:8000/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(credentials)
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("travlogapi_token", res.token)
                    setIsLoggedIn(true)
                }
            })
    }

    const logout = () => {
        setIsLoggedIn(false)
        localStorage.removeItem("travlogapi_token")
    }

    return { login, register, isAuthenticated, logout }
}

export default UseSimpleAuth