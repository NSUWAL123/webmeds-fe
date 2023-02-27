import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { isUserLoggedIn } from '../utils/handleToken'

const ProtectedRoutes = () => {
  const isAuthenticated = isUserLoggedIn();
  const navigate = useNavigate();
  return (
    !isAuthenticated ? <Outlet/> : navigate('/login')
  )
}

export default ProtectedRoutes;