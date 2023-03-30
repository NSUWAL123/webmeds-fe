import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import PageNotFound from '../pages/PageNotFound';
import { getTokenFromLocalStorage, isUserLoggedIn } from '../utils/handleToken'

const AdminProtectedRoutes = () => {
  const isAuthenticated = isUserLoggedIn();
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getTokenFromLocalStorage(),
    },
  };
  useEffect(() => {
    (async () => {
      const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/getUser`, config);
      setRole(data.role);
    })() 
  }, [])
  
  return (
    (role !== "" && role === "admin") ? <Outlet/> : navigate("/unauthorized")
  )
}

export default AdminProtectedRoutes;