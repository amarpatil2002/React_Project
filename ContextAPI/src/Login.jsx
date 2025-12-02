import React, { useContext, useState } from 'react'
import { userContext } from './context/UserContext'

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const {setUser} = useContext(userContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    setUser({username,password})

  }

  return (
    <>
    <h3>Login User</h3>
    <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder='enter username' /> <br /><br />
    <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder='enter password' /> <br /><br />
    <button onClick={handleSubmit} >Login</button>
    </>
  )
}

export default Login