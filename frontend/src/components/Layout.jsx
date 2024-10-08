import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="py-4  px-8 flex flex-col min-h-screen bg-bodybg">
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Layout