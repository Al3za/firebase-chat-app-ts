import React, { useEffect, useState } from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


const AuthRoute = (props:any) => {
    const { children } = props
    const auth = getAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        AuthCheck()
    }, [auth])
    
    const AuthCheck = onAuthStateChanged(auth, (user) => {
        if (user) {
            setLoading(false)
        } else {
            console.log('Unauthorized')
            navigate('/')
        }
    })

    if (loading) return <p> loading ... </p>

    return <> {children} </>
    // if we get to this point we render the page we wanna render ( {children} is the page we wanna render : BrandsData)
}

export default AuthRoute