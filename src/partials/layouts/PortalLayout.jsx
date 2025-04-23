import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/topbar'

const PortalLayout = () => {
  return (
    <div className="portal-layout">
      <aside className='sidebar'>
        <Sidebar />
      </aside>
      <header className='header'>
        <Topbar />
      </header>
      <Outlet />
    </div>
  )
}

export default PortalLayout