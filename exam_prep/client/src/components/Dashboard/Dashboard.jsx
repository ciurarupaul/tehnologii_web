import './Dashboard.css'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// selectors
const userTypeSelector = state => state.user.data.type

const Dashboard = () => {
  const userType = useSelector(userTypeSelector)

  return (
    <div className='dashboard'>
      <h1>Dashboard for {userType}</h1>

      {userType === 'admin' && (
        <div>
          TODO
        </div>
      )}

      {userType === 'regular' && (
        <div>
          <Link to='/projects'>Projects</Link>
        </div>
      )}
    </div>
  )
}

export default Dashboard
