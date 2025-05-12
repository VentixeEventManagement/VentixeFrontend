import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'

const AdminRoute = ({ children }) => {

    try {
        const [cookies] = useCookies(['cookie-userId']);
        const { isAuthenticated } = useSelector((state) => state.auth);
        const isAdmin = true;

        if (isAuthenticated && isAuthenticated !== undefined || cookies.userId !== null) {
            if (isAdmin) {
                return children
            }

            return <Navigate to="/denied" replace />
        }
    }
    catch { }

    return <Navigate to="/login" replace />
}

export default AdminRoute