import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import HamburgerIcon from '../../components/hamburgerIcon/HamburgerIcon'

const PortalLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="portal-layout">
        <HamburgerIcon onClicked={toggleMenu} isActive={isMenuOpen} />

      <Sidebar />

      <header className='header'>
        <Topbar />
      </header>
      <Outlet />
    </div>
  )
}

export default PortalLayout