import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import HamburgerIcon from '../../components/hamburgerIcon/HamburgerIcon'
import MobileTopbar from '../../components/mobileTopbar/MobileTopbar'

const PortalLayout = () => {
  
  return (
    <div className="portal-layout">
      <Sidebar />

      <MobileTopbar />
      <header className='header'>
        <Topbar />
      </header>
      <Outlet />
    </div>
  )
}

export default PortalLayout