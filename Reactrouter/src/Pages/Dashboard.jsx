import React from 'react'
import { useParams } from 'react-router-dom'

function Dashboard() {
  const {userid} = useParams()
  return (
    <div>Dashboard : {userid} </div>
  )
}

export default Dashboard