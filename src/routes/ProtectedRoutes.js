import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import { getTokenFromLocalStorage, isUserLoggedIn } from '../utils/handleToken'

const ProtectedRoutes = () => {
  const isAuthenticated = isUserLoggedIn();
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  
  return (
    // (!isAuthenticated) ? <Outlet/> : navigate('/login')
    (!isAuthenticated) ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default ProtectedRoutes;