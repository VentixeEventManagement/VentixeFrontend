import React from 'react'
import { Outlet } from 'react-router-dom'
import SkipAuthButton from '../../components/DevKit/SkipAuthButton.jsx'

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <SkipAuthButton />
      <Outlet />
    </div>
  )
}

export default AuthLayout