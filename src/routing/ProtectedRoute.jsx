import React from 'react'
import { Navigate } from 'react-router-dom'
// import { useAuth } from '../contexts/AuthContext'
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    try {
        const { isAuthenticated } = useSelector((state) => state.signup)

        if (isAuthenticated && isAuthenticated !== undefined) {
            return children
        }

    }
    catch { }

    return <Navigate to="/login" replace />
}

export default ProtectedRoute