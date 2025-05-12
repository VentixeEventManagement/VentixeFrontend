import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ children }) => {
    try {
        const [cookies] = useCookies(['cookie-userId']);
        const { isAuthenticated } = useSelector((state) => state.auth);

        if (isAuthenticated && isAuthenticated !== undefined || cookies.userId) {
            return children
        }

    }
    catch { }

    return <Navigate to="/login" replace />
}

export default ProtectedRoute