import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PublicRoutes() {

    const [token , setToken] = useState(true)
    // const token = localStorage.getItem("token")


    if(token) return <Navigate to='dashboard' replace />

    return <Outlet/> 

}

export default PublicRoutes