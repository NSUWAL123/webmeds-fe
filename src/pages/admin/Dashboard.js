import React from 'react'
import DashMonth from '../../components/admin/dashboard/DashMonth'
import AdminProtectedRoutes from "../../routes/AdminProtectedRoutes"
const Dashboard = () => {
  return (
    <div>
      <AdminProtectedRoutes/>
      <div className='h-[100%]'>
        <DashMonth/>
      </div>

    </div>
  )
}

export default Dashboard