import React from 'react'
import ProtectedRoutes from '../routes/ProtectedRoutes'

const NotificationPage = () => {
  return (
    <div>
      <ProtectedRoutes/>
      <p>NotificationPage</p>
    </div>
  )
}

export default NotificationPage