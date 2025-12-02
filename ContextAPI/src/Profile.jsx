import React from 'react'
import { useContext } from 'react'
import { userContext } from './context/UserContext'

function Profile() {

  const {user} = useContext(userContext)

  return (
    <div>Welcome , {user && user.username}</div>
  )
}

export default Profile