import React from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import { Outlet, useLocation } from 'react-router-dom'

export default function MainLayOut() {
  const location = useLocation()
  return (
    <>
      {/* <Navbar/> */}
      {location.pathname !== "/category" && <Navbar />}
     <Outlet/>
    </>
  )
}
